from django.urls import path, include
from .views import VideoListViewSet, VideoDetailViewSet, VideoCreateViewSet, UserViewSet, CommentaryCreateViewSet, LikeCreateViewSet, SubscriptionCreateViewSet
from rest_framework.routers import DefaultRouter
#from .views import VideoList, VideoDetails
#from .views import video_list, video_details
from .views import CustomAuthToken

router = DefaultRouter()
router.register('videos', VideoListViewSet, basename='videos')
router.register('videos_detail', VideoDetailViewSet, basename='videos_detail')
router.register('videos_create', VideoCreateViewSet, basename='videos_create')
router.register('users', UserViewSet)
router.register('commentary', CommentaryCreateViewSet)
router.register('like', LikeCreateViewSet)
router.register('subscription', SubscriptionCreateViewSet)
#router.register('auth', CustomAuthToken, basename='auth')

urlpatterns = [
    path('api/', include(router.urls))
    #path('videos/', VideoList.as_view()),
    #path('videos/<int:id>', VideoDetails.as_view()),
    #path('videos/', video_list),
    #path('videos/<int:pk>', video_details),
]