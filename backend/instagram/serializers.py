from rest_framework import serializers
from django.contrib.auth import get_user_model
from instagram.models import Post

User = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id'] #FIXME : profile추가후 사진 추가 필요

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'author', 'caption', 'photo', 'location', 'created_at']