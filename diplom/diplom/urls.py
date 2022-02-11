from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static
from api.views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api-auth/', include('rest_framework.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    #path('auth/', include('rest_framework_social_oauth2.urls')),
    #path('auth/', include('djoser.urls')),
    #path('auth/', include('djoser.urls.authtoken')),
    #path('auth/', include('djoser.urls.jwt')),
    path('', include('api.urls')),
    #path('auth/', obtain_auth_token),
    path('auth/', CustomAuthToken.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
