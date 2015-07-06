from rest_framework import viewsets, generics, permissions, views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from lumi_rest.permissions import IsOwnerOrReadOnly
from lumi_rest import serializers, models


@api_view(['GET'])
def api_root(request, format=None):
	return Response({
		'user': reverse('user-list', request=request, format=format),
		'feed-item': reverse('feeditem-list', request=request, format=format),
		'comment': reverse('comment-list', request=request, format=format),
		'topic': reverse('topic-list', request=request, format=format),
		'actor': reverse('actor-list', request=request, format=format),
		'event': reverse('event-list', request=request, format=format),
		'fact': reverse('fact-list', request=request, format=format),
		'reference': reverse('reference-list', request=request, format=format),
		'letter': reverse('letter-list', request=request, format=format),
		'news-cluster': reverse(
			'newscluster-list', request=request, format=format),
		'news-item': reverse('newsitem-list', request=request, format=format),
		'issue': reverse('issue-list', request=request, format=format),
	})


class UserList(generics.ListAPIView):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer


class UserDetail(generics.RetrieveAPIView):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer


class FeedItemViewSet(viewsets.ModelViewSet):
	queryset = models.FeedItem.objects.all()
	serializer_class = serializers.FeedItemSerializer



class UserCommentListView(generics.ListAPIView):
	serializer_class = serializers.CommentSerializer

	def get_queryset(self):
		return models.Comment.objects.filter(
			author__pk=self.kwargs.get('pk')
		)



class CommentViewSet(viewsets.ModelViewSet):
	permission_classes = [
		permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
	]
	queryset = models.Comment.objects.all()
	serializer_class = serializers.CommentSerializer
	def perform_create(self, serializer):
		serializer.save(author=self.request.user)


class TopicViewSet(viewsets.ModelViewSet):
	queryset = models.Topic.objects.all()
	serializer_class = serializers.TopicSerializer

class ActorViewSet(viewsets.ModelViewSet):
	queryset = models.Actor.objects.all()
	serializer_class = serializers.ActorSerializer

class EventViewSet(viewsets.ModelViewSet):
	queryset = models.Event.objects.all()
	serializer_class = serializers.EventSerializer

class FactViewSet(viewsets.ModelViewSet):
	queryset = models.Fact.objects.all()
	serializer_class = serializers.FactSerializer

class ReferenceViewSet(viewsets.ModelViewSet):
	queryset = models.Reference.objects.all()
	serializer_class = serializers.ReferenceSerializer

class LetterViewSet(viewsets.ModelViewSet):
	queryset = models.Letter.objects.all()
	serializer_class = serializers.LetterSerializer

class NewsClusterViewSet(viewsets.ModelViewSet):
	queryset = models.NewsCluster.objects.all()
	serializer_class = serializers.NewsClusterSerializer

class NewsItemViewSet(viewsets.ModelViewSet):
	queryset = models.NewsItem.objects.all()
	serializer_class = serializers.NewsItemSerializer

class IssueViewSet(viewsets.ModelViewSet):
	queryset = models.Issue.objects.all()
	serializer_class = serializers.IssueSerializer

