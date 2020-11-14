from django.contrib import admin
from django.utils.safestring import mark_safe
from instagram.models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'caption', 'photo_url', 'location']
    
    def photo_url(self, post):
        return mark_safe(f'<img src={post.photo.url} alt={post.caption} style="width:200px"/>')
    
