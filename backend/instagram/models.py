from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract=True

class Post(BaseModel):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.CharField(max_length=500, blank=False)
    photo = models.ImageField(blank=False, upload_to="instagram/post/%Y/%m/%d")
    location = models.CharField(max_length=20, blank=False)
    
    def __str__(self):
        return self.caption