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
