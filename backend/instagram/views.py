from django.db.models import Q
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied
from instagram.models import Post
from instagram.serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        now_user = self.request.user
        qs = super().get_queryset()
        qs = qs.filter(Q(author=now_user) | Q(author__in=now_user.following_set.all()))
        return qs

    def perform_create(self, serializer):
        now_user = self.request.user
        serializer.save(author=now_user)

    def perform_destroy(self, instance):
        if self.request.user == instance.author:
            instance.delete()
        else:
            raise PermissionDenied("작성자만 삭제할 수 있습니다")
