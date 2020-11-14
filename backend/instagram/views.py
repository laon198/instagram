from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from instagram.models import Post
from instagram.serializers import PostSerializer

class PostViewSet(ModelViewSet):
    queryset =  Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        now_user = self.request.user
        serializer(author=now_user)
        serializer.save()