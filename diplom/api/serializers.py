from rest_framework import serializers
from .models import Video, Commentary, Like, Subscription
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class CommentaryCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Commentary
        fields = "__all__"

class LikeCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = "__all__"

class SubscriptionCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = "__all__"

class FilterCommentarySerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)

class RecursiveSerializer(serializers.Serializer):

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CommentarySerializer(serializers.ModelSerializer):

    children = RecursiveSerializer(many=True)
    name = serializers.SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        list_serializer_class = FilterCommentarySerializer
        model = Commentary
        fields = ['id', 'name', 'content', 'children']

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ['id', 'author', 'video', 'grade']

class SubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = ['id', 'author', 'video', 'subscription']


class VideoListSerializer(serializers.ModelSerializer):

    author = serializers.SlugRelatedField(slug_field='username', read_only=True)
    commentaries = CommentarySerializer(many=True)
    likes = LikeSerializer(many=True)
    subscriptions = SubscriptionSerializer(many=True)
    class Meta:
        model = Video
        fields = '__all__'

class VideoCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = '__all__'

class VideoDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password':
                            {'write_only': True,
                             'required': True,
                            },
                        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user



