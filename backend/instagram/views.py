from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied
from instagram.models import Post, Comment
from instagram.serializers import PostSerializer, CommentSerializer
import json


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=["post"]) #FIXME
    def like(self, request, pk):
        post = self.get_object()
        now_user = request.user
        post.like_set.add(now_user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        now_user = request.user
        post.like_set.remove(now_user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        now_user = self.request.user
        qs = super().get_queryset()
        qs = qs.filter(Q(author=now_user) | Q(author__in=now_user.following_set.all())) #FIXME
        return qs

    def perform_create(self, serializer):
        now_user = self.request.user
        serializer.save(author=now_user)

    def perform_destroy(self, instance):
        if self.request.user == instance.author:
            instance.delete()
        else:
            raise PermissionDenied("작성자만 삭제할 수 있습니다")


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        qs = super().get_queryset()
        qs = qs.filter(post=post)
        return qs

    def perform_create(self, serializer):
        now_user = self.request.user
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=now_user, post=post)

    def perform_destroy(self, instance):
        if self.request.user == instance.author:
            instance.delete()
        else:
            raise PermissionDenied("작성자만 삭제할 수 있습니다")

    @action(detail=True, methods=["post"])
    def like(self, request, post_pk, pk):
        comment = self.get_object()
        now_user = request.user
        comment.like_set.add(now_user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @like.mapping.delete
    def unlike(self, request, post_pk, pk):
        comment = self.get_object()
        now_user = request.user
        comment.like_set.remove(now_user)
        return Response(status=status.HTTP_204_NO_CONTENT)
