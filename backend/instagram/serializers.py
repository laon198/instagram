from rest_framework import serializer
from django.contrib.auth import get_user_model
from instagram.models import Post

User = get_user_model()

class AuthorSerializer(serializer.ModelSerializer):
    class Meta:
        Model = User
        fields = ['username', 'id'] #FIXME : profile추가후 사진 추가 필요

class PostSerializer(serializer.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    class Meta:
        Model = Post
        fields = ['id', 'author', 'caption', 'photo', 'loaction', 'created_at']