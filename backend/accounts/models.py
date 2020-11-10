from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


class User(AbstractUser):
    email = models.EmailField(blank=False, unique=True)
    profile = models.OneToOneField(
        "Profile", on_delete=models.CASCADE, null=True, blank=True
    )
    phone_number = models.CharField(
        max_length=13,
        blank=True,
        validators=[
            RegexValidator(
                regex="^010-?[1-9]\\d{3}-?\\rd{4}$",
                message="Please check your phone number",
            ),
        ],  # FIXME validator
    )


class Profile(models.Model):
    class Gender(models.TextChoices):
        MALE = "M", "Male"
        FEMALE = "F", "Female"

    website = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    gender = models.CharField(max_length=1, choices=Gender.choices, blank=True)
