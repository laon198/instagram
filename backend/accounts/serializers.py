from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.models import Profile

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
