from django import forms
from django.contrib import admin
from .models import Video, Commentary, Subscription, Like, DisLike
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class VideoContentAdminForm(forms.ModelForm):
    description = forms.CharField(label='Описание', widget=CKEditorUploadingWidget())
    poster = forms.CharField(label='Постер', widget=CKEditorUploadingWidget())
    content = forms.CharField(label='Видосик', widget=CKEditorUploadingWidget())
    class Meta:
        model = Video
        fields = '__all__'

@admin.register(Video)
class VideoContentAdmin(admin.ModelAdmin):
    form = VideoContentAdminForm




admin.site.register(Commentary)
admin.site.register(Subscription)
admin.site.register(Like)
admin.site.register(DisLike)
