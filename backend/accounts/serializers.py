from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.models import Profile
from instagram.models import Post

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        instance = super().create(validated_data)
        raw_password = self.validated_data["password"]
        instance.set_password(raw_password)

        profile = Profile.objects.create()
        instance.profile = profile
        instance.save()

        return instance

    class Meta:
        model = User
        fields = ["email", "phone_number", "username", "password"]


class SuggestionSerializer(serializers.ModelSerializer):
    is_follow = serializers.SerializerMethodField()

    def get_is_follow(self, suggestionUser):
        now_user = self.context["request"].user
        if now_user.following_set.filter(username=suggestionUser.username).exists():
            return True
        else:
            return False

    class Meta:
        model = User
        fields = ["id", "username", "is_follow"]  # FIXME: avatar add, follow add


class ProfileSerializer(serializers.ModelSerializer):
    photo_list = serializers.SerializerMethodField()
    how_posts = serializers.SerializerMethodField()
    how_followings = serializers.SerializerMethodField()
    how_followers = serializers.SerializerMethodField()

    def get_photo_list(self, user):
        post_set = user.post_set.all()
        photo_list = []
        for post in post_set:
            request = self.context["request"]
            scheme = request.scheme
            host = request.get_host()
            url = scheme + "://" + host + post.photo.url
            photo_list.append(url)
        return photo_list

    def get_how_posts(self, user):
        return user.post_set.count()

    def get_how_followings(self, user):
        return user.following_set.count()

    def get_how_followers(self, user):
        return user.follower_set.count()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "how_posts",
            "how_followings",
            "how_followers",
            "photo_list",
        ]
