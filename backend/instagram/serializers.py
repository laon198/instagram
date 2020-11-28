from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime, intcomma
from instagram.models import Post, Comment

User = get_user_model()


class AuthorSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    def get_avatar(self, author):
        if author.profile.avatar:
            request = self.context["request"]
            scheme = request.scheme
            host = request.get_host()
            url = scheme + "://" + host + author.profile.avatar.url
            return url
        else:
            return ""

    class Meta:
        model = User
        fields = ["username", "id", "avatar"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField()
    how_like = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()

    def get_created_at(self, post):
        return naturaltime(post.created_at)

    def get_how_like(self, post):
        return intcomma(post.like_set.count())

    def get_is_like(self, post):
        now_user = self.context["request"].user
        if now_user in post.like_set.all():
            return True
        else:
            return False

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "is_like",
            "how_like",
            "caption",
            "photo",
            "location",
            "created_at",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField()

    def get_is_like(self, comment):
        now_user = self.context["request"].user
        if now_user in comment.like_set.all():
            return True
        else:
            return False

    class Meta:
        model = Comment
        fields = ["id", "author", "message", "is_like"]
