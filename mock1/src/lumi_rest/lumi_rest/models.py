from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ugettext as __
from django.core.urlresolvers import reverse
from django.template.defaultfilters import slugify
from django.utils.safestring import mark_safe
from django.contrib.staticfiles.templatetags.staticfiles import static
import re
import os

URL_MAX_LENGTH = 2048
DESCRIPTION_MAX_LENGTH = 4096
TITLE_MAX_LENGTH = 512



class TimeStamped(models.Model):
	creation_date = models.DateTimeField(editable=False, 
		verbose_name=_('creation date'))
	last_modified = models.DateTimeField(editable=False, 
		verbose_name=_('last modified'))

	def save(self, *args, **kwargs):
		if not self.creation_date:
			self.creation_date = timezone.now()
		
		self.last_modified = timezone.now()
		return super(TimeStamped, self).save(*args, **kwargs)

	class Meta:
		abstract = True


class FeedItem(TimeStamped):

	tipe_choices = (
		('NEWS_ITEM', 'NEWS_ITEM'),
		('COMMENT', 'COMMENT'),
		('LETTER', 'LETTER'),
		('NEWS_CLUSTER', 'NEWS_CLUSTER'),
	)


	pub_date = models.DateTimeField()
	image_url = models.CharField(max_length=URL_MAX_LENGTH)
	issue = models.ForeignKey('Issue')
	score = models.IntegerField()
	text = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)
	title = models.CharField(max_length=TITLE_MAX_LENGTH)
	topic = models.ForeignKey('Topic')
	tipe = models.CharField(max_length=16, choices=tipe_choices)
	author = models.ForeignKey('auth.User')
	comments = models.ManyToManyField('Comment')


class Comment(TimeStamped):
	author = models.ForeignKey('auth.User', related_name='comments')
	text = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)


class Topic(TimeStamped):
	title = models.CharField(max_length=TITLE_MAX_LENGTH)
	text = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)


class Actor(TimeStamped):
	title = models.CharField(max_length=TITLE_MAX_LENGTH)
	fname = models.CharField(max_length=TITLE_MAX_LENGTH)
	lname = models.CharField(max_length=TITLE_MAX_LENGTH)
	image_url = models.CharField(max_length=URL_MAX_LENGTH)
	external_url = models.CharField(max_length=URL_MAX_LENGTH)
 

class Event(TimeStamped):
	title = models.CharField(max_length=TITLE_MAX_LENGTH)
	text = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)
	location = models.CharField(max_length=TITLE_MAX_LENGTH)
	event_start = models.DateTimeField()
	event_end = models.DateTimeField()


class Fact(TimeStamped):
	text = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)
	author = models.ForeignKey('auth.User')
	refs = models.ManyToManyField('Reference')


class Reference(TimeStamped):
	pass
	


class Letter(TimeStamped):
	pass


class NewsCluster(TimeStamped):
	pass


class NewsItem(TimeStamped):
	pass



class Issue(TimeStamped):
	text = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)
	title = models.CharField(max_length=TITLE_MAX_LENGTH)
	actors = models.ManyToManyField('Actor')
	events = models.ManyToManyField('Event')
	facts = models.ManyToManyField('Fact')
	icon_url = models.CharField(max_length=URL_MAX_LENGTH)
	image_url = models.CharField(max_length=URL_MAX_LENGTH)
	letters = models.ManyToManyField('Letter')
	news = models.ManyToManyField('NewsItem')


