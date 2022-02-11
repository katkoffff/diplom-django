from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField


class Video(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='author_video')
    title = models.CharField('Название', max_length=30)
    description = models.TextField('Описание')
    createddate = models.DateTimeField(auto_now_add=True)
    poster = RichTextField()
    content = RichTextField()


class Commentary(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='author_commentary', related_name='author_name')
    video = models.ForeignKey(Video, on_delete=models.CASCADE, verbose_name='video_commentary', related_name='commentaries')
    content = models.TextField('Комментарий')
    parent = models.ForeignKey('self', verbose_name='parent', on_delete=models.SET_NULL, blank=True, null=True, related_name='children')


class Subscription(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='author_subscription')
    video = models.ForeignKey(Video, on_delete=models.CASCADE, verbose_name='video_subscription', related_name='subscriptions')
    subscription = models.BooleanField('Подписка', default=False)


class Like(models.Model):
    likes = [('like', 'like'),
             ('dislike', 'dislike'),
             ('without', 'without')]
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='author_like')
    video = models.ForeignKey(Video, on_delete=models.CASCADE, verbose_name='video_like', related_name='likes')
    grade = models.CharField('оценка', max_length=7, choices=likes, default='without')


'''    
    like = models.BooleanField('Лайк', default=False, blank=True, null=True)


class DisLike(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='author_dislike', blank=True, null=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, verbose_name='video_dislike', blank=True, null=True)
    dislike = models.BooleanField('Дизлайк', default=False, blank=True, null=True)
'''

