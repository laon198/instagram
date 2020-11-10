from django.contrib import admin
from django.contrib.auth import get_user_model

from accounts.models import Profile

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass
