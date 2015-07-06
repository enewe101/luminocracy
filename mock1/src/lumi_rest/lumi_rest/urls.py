from django.conf.urls import patterns, include, url
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib import admin
from lumi_rest import views


# Routers provide an easy way of automatically determining the URL conf.
router = routers.SimpleRouter()
router.register(r'feed-item', views.FeedItemViewSet)
router.register(r'comment', views.CommentViewSet)
router.register(r'topic', views.TopicViewSet)
router.register(r'actor', views.ActorViewSet)
router.register(r'event', views.EventViewSet)
router.register(r'fact', views.FactViewSet)
router.register(r'reference', views.ReferenceViewSet)
router.register(r'letter', views.LetterViewSet)
router.register(r'news-cluster', views.NewsClusterViewSet)
router.register(r'news-item', views.NewsItemViewSet)
router.register(r'issue', views.IssueViewSet)


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'lumi_rest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

	url(r'^', include(router.urls)),
	url(r'^$', views.api_root),
	url(r'^user/$', views.UserList.as_view(), name='user-list'),
	url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), 
		name='user-detail'),
	url(r'^user/(?P<pk>[0-9]+)/comment/$', 
		views.UserCommentListView.as_view(), name='user-comment-list'),
    url(r'^admin/', include(admin.site.urls)),
	url(r'^api-auth/', include('rest_framework.urls', 
		namespace='rest_framework')),
)
