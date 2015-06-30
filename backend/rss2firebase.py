import datetime
import sqlite3
import feedparser
import wikipedia
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer,CountVectorizer
from sklearn.cluster import SpectralClustering,MeanShift,KMeans,AffinityPropagation,DBSCAN
from sklearn.metrics.pairwise import cosine_similarity
from firebase import firebase

firebase = firebase.FirebaseApplication('https://vivid-torch-4114.firebaseio.com',None)

conn = sqlite3.connect('rss.db')
c = conn.cursor()
# Create table
c.execute('''CREATE TABLE IF NOT EXISTS providers (id integer PRIMARY KEY, name text, url text UNIQUE)''')
c.execute('''CREATE TABLE IF NOT EXISTS clusters (id integer PRIMARY KEY, name text, summary text UNIQUE, created text)''')
c.execute('''CREATE TABLE IF NOT EXISTS news (id integer PRIMARY KEY, title text, summary text, created text, cluster_id integer, provider_id integer, FOREIGN KEY(cluster_id) REFERENCES clusters(id), FOREIGN KEY(provider_id) REFERENCES providers(id), UNIQUE (title, summary, provider_id) ON CONFLICT IGNORE)''')
conn.commit()

# Insert a row of data
c.execute("INSERT OR IGNORE INTO providers VALUES (null,'CNN','http://rss.cnn.com/rss/edition.rss')")
c.execute("INSERT OR IGNORE INTO providers VALUES (null,'RT','http://rt.com/rss/')")
c.execute("INSERT OR IGNORE INTO providers VALUES (null,'AlJazeera','http://www.aljazeera.com/xml/rss/all.xml')")
c.execute("INSERT OR IGNORE INTO providers VALUES (null,'BBC','http://feeds.bbci.co.uk/news/rss.xml')")

# Save (commit) the changes
conn.commit()

rss_feeds = c.execute("SELECT id,url FROM PROVIDERS")

documents = []
documents_with_feed = []

news_items = []
for provider_id,url in rss_feeds:
    d = feedparser.parse(url)
    for entry in d['entries']:
	title = entry['title'].strip()
	summary = BeautifulSoup(entry['summary']).get_text().strip()
	news_items.append((None,title,summary,str(datetime.date.today()),None,provider_id))
c.executemany("INSERT INTO news VALUES (?,?,?,?,?,?)",news_items)
conn.commit()

news_items_query = c.execute("SELECT id,title,summary FROM news WHERE cluster_id is NULL")
for news_id,title,summary in news_items_query:
	documents.append(title+' '+summary)
	documents_with_feed.append({'title':title,'summary':summary,'id':news_id})

vect = TfidfVectorizer(min_df=1,stop_words='english')
tfidf = vect.fit_transform(documents)

result = (tfidf * tfidf.T).A
for index,item in enumerate(result):
	for index2,item2 in enumerate(item):
		result[index][index2] = 1.00 - result[index][index2]

clusters = DBSCAN(eps=0.75, min_samples=1, metric="precomputed").fit_predict(result)


clusters_result = dict()

for index,item in enumerate(clusters):
	if item not in clusters_result:
		clusters_result[item] = []
	clusters_result[item].append(documents_with_feed[index])

for cluster in clusters_result:
	if len(clusters_result[cluster])<2:
		continue
	cluster_docs = ""
	for item in clusters_result[cluster]:
		cluster_docs += " "+ item['title']+" "+item['summary']
	c.execute("INSERT OR IGNORE INTO clusters VALUES (?,?,?,?)",(None,'',cluster_docs,str(datetime.date.today())))
	conn.commit()
	cluster_id = c.execute("SELECT id FROM clusters WHERE summary=?",[cluster_docs]).fetchone()[0]
	for item in clusters_result[cluster]:
		c.execute("UPDATE news SET cluster_id="+str(cluster_id)+" WHERE id="+str(item['id']))
	conn.commit()
last_cluster_id = None

for cluster_id,title in c.execute("SELECT cluster_id,title FROM news WHERE cluster_id IS NOT NULL ORDER BY cluster_id"):
	print "{0}: {1}".format(str(cluster_id),title)		
