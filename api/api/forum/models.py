from django.db import models
from django.utils.text import slugify
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(
        'Profile', on_delete=models.CASCADE, related_name='posts'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    body = models.TextField()
    image = models.ImageField(upload_to='posts/images/', blank=True, null=True) # Change to cloudinary for deployment

    category = models.CharField(max_length=100, blank=True, null=True)
    tags = models.CharField(max_length=250, blank=True, null=True, help_text="Comma-separated tags")

    users_liked = models.ManyToManyField(
        'Profile', related_name='liked_posts', blank=True
    )

    views = models.PositiveIntegerField(default=0)
    pinned = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    edited_at = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Post.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        if self.pk:
            self.edited_at = timezone.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} by {self.author.user.username}"

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['slug', 'created_at'])]


class Comment(models.Model):
    post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, related_name='comments'
    )
    author = models.ForeignKey(
        'Profile', on_delete=models.CASCADE, related_name='comments'
    )
    parent = models.ForeignKey(
        'self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE
    )
    body = models.TextField()
    image = models.ImageField(upload_to='comments/images/', blank=True, null=True)
    users_liked = models.ManyToManyField(
        'Profile', related_name='liked_comments', blank=True
    )

    is_edited = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def mark_edited(self):
        self.is_edited = True
        self.save(update_fields=['is_edited', 'updated_at'])

    def __str__(self):
        return f"{self.author.user.username}: {self.body[:40]}"

    class Meta:
        ordering = ['created_at']
