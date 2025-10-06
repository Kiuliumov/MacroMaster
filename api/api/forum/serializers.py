from rest_framework import serializers
from .models import Post, Comment
from ..profiles.serializers import ProfileSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    likes_count = serializers.IntegerField(source='users_liked.count', read_only=True)
    parent_id = serializers.IntegerField(write_only=True, required=False)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'author', 'body', 'image',
            'parent', 'parent_id', 'replies',
            'likes_count', 'is_edited', 'is_deleted',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'is_edited', 'is_deleted', 'replies']

    def get_replies(self, obj):
        """Return a limited number of nested replies"""
        replies_qs = obj.replies.filter(is_deleted=False).order_by('created_at')[:5]
        return CommentSerializer(replies_qs, many=True, context=self.context).data



class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    likes_count = serializers.IntegerField(source='users_liked.count', read_only=True)
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'body', 'image', 'attachments',
            'category', 'tags',
            'author', 'likes_count', 'comments_count', 'comments',
            'created_at', 'updated_at', 'edited_at'
        ]
        read_only_fields = ['slug', 'author', 'created_at', 'updated_at', 'edited_at']

    def get_comments(self, obj):
        """Return the latest few comments on the post"""
        comments_qs = obj.comments.filter(parent__isnull=True, is_deleted=False).order_by('-created_at')[:5]
        return CommentSerializer(comments_qs, many=True, context=self.context).data
