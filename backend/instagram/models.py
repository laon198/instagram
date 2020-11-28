from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(BaseModel):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="my_post_set"
    )
    caption = models.CharField(max_length=500, blank=False)
    photo = models.ImageField(blank=False, upload_to="instagram/post/%Y/%m/%d")
    location = models.CharField(max_length=20, blank=False)
    like_set = models.ManyToManyField(User, blank=True, related_name="like_post_set")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.caption


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="my_comment_set"
    )
    like_set = models.ManyToManyField(User, blank=True, related_name="like_comment_set")
    message = models.CharField(max_length=100)

    class Meta:
        ordering = ["-created_at"]
