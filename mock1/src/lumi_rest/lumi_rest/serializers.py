from django.forms import widgets
from rest_framework import serializers
from lumi_rest import models

class UserSerializer(serializers.HyperlinkedModelSerializer):

	comments = serializers.HyperlinkedRelatedField(
		many=True, view_name='comment-detail', read_only=True
	)
	#feed_items = serializers.HyperlinkedRelatedField(
	#	view_name='feed-item-list', read_only=True
	#)
	#events = serializers.HyperlinkedRelatedField(
	#	view_name='event-list', read_only=True
	#)
	#facts = serializers.HyperlinkedRelatedField(
	#	view_name='fact-list', read_only=True
	#)
	#news_items = serializers.HyperlinkedRelatedField(
	#	view_name='news-item-list', read_only=True
	#)

	class Meta:
		model = models.User
		fields = [
			'url', 'username', 'comments',
			#'feed_items', 'events', 'facts', 'news_items'
		]


class FeedItemSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.FeedItem
		fields = [
			'pub_date', 'image_url', 'issue', 'score', 'text',
			'title', 'topic', 'tipe', 'author', 'comments', 'url'
		]


class CommentSerializer(serializers.HyperlinkedModelSerializer):
	author = serializers.ReadOnlyField(source='author.username')
	class Meta:
		model = models.Comment
		fields = ['author', 'text', 'url']


class TopicSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Topic
		fields = ['title', 'text', 'url']


class ActorSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Actor
		fields = [
			'title', 'fname', 'lname', 'image_url', 'external_url', 'url'
		]


class EventSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Event
		fields = [
			'title', 'text', 'location', 'event_start', 'event_end', 'url'
		]


class FactSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Fact
		fields = ['text', 'author', 'refs', 'url']


class ReferenceSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Reference
		fields = ['url']


class LetterSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Letter
		fields = ['url']


class NewsClusterSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.NewsCluster
		fields = ['url']


class NewsItemSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.NewsItem
		fields = ['url']


class IssueSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Issue
		fields = [
			'text', 'title', 'actors', 'events', 'facts', 'icon_url', 
			'image_url', 'letters', 'news', 'url'
		]



