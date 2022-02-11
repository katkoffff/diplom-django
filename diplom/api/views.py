from .models import Video, Commentary, Like, Subscription
from .serializers import VideoListSerializer, VideoCreateSerializer, VideoDetailSerializer, UserSerializer, \
    CommentaryCreateSerializer, LikeCreateSerializer, SubscriptionCreateSerializer
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user_name': user.username
        })


class VideoListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoListSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = [IsAuthenticated]

class VideoCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoCreateSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = [IsAuthenticated]

class VideoDetailViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoDetailSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = [IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]


class CommentaryCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Commentary.objects.all()
    serializer_class = CommentaryCreateSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

class LikeCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeCreateSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

class SubscriptionCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionCreateSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]


