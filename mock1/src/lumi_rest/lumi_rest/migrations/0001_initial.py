# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('title', models.CharField(max_length=512)),
                ('fname', models.CharField(max_length=512)),
                ('lname', models.CharField(max_length=512)),
                ('image_url', models.CharField(max_length=2048)),
                ('external_url', models.CharField(max_length=2048)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('text', models.CharField(max_length=4096)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('title', models.CharField(max_length=512)),
                ('text', models.CharField(max_length=4096)),
                ('location', models.CharField(max_length=512)),
                ('event_start', models.DateTimeField()),
                ('event_end', models.DateTimeField()),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Fact',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('text', models.CharField(max_length=4096)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FeedItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('pub_date', models.DateTimeField()),
                ('image_url', models.CharField(max_length=2048)),
                ('score', models.IntegerField()),
                ('text', models.CharField(max_length=4096)),
                ('title', models.CharField(max_length=512)),
                ('tipe', models.CharField(max_length=16, choices=[(b'NEWS_ITEM', b'NEWS_ITEM'), (b'COMMENT', b'COMMENT'), (b'LETTER', b'LETTER'), (b'NEWS_CLUSTER', b'NEWS_CLUSTER')])),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('comments', models.ManyToManyField(to='lumi_rest.Comment')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('text', models.CharField(max_length=4096)),
                ('title', models.CharField(max_length=512)),
                ('icon_url', models.CharField(max_length=2048)),
                ('image_url', models.CharField(max_length=2048)),
                ('actors', models.ManyToManyField(to='lumi_rest.Actor')),
                ('events', models.ManyToManyField(to='lumi_rest.Event')),
                ('facts', models.ManyToManyField(to='lumi_rest.Fact')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Letter',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='NewsCluster',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='NewsItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(verbose_name='creation date', editable=False)),
                ('last_modified', models.DateTimeField(verbose_name='last modified', editable=False)),
                ('title', models.CharField(max_length=512)),
                ('text', models.CharField(max_length=4096)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='issue',
            name='letters',
            field=models.ManyToManyField(to='lumi_rest.Letter'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='issue',
            name='news',
            field=models.ManyToManyField(to='lumi_rest.NewsItem'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='feeditem',
            name='issue',
            field=models.ForeignKey(to='lumi_rest.Issue'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='feeditem',
            name='topic',
            field=models.ForeignKey(to='lumi_rest.Topic'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='fact',
            name='refs',
            field=models.ManyToManyField(to='lumi_rest.Reference'),
            preserve_default=True,
        ),
    ]
