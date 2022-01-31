from django.urls import path, include
from .views import VideoViewSet, UserViewSet
from rest_framework.routers import DefaultRouter
#from .views import VideoList, VideoDetails
#from .views import video_list, video_details

router = DefaultRouter()
router.register('videos', VideoViewSet, basename='videos')
router.register('users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls))
    #path('videos/', VideoList.as_view()),
    #path('videos/<int:id>', VideoDetails.as_view()),
    #path('videos/', video_list),
    #path('videos/<int:pk>', video_details),
]