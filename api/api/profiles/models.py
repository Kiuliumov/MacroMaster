from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class UserModel(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')

    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    height_cm = models.FloatField(null=True, blank=True)
    weight_kg = models.FloatField(null=True, blank=True)
    activity_level = models.CharField(
        max_length=20,
        choices=[
            ('sedentary', 'Sedentary'),
            ('light', 'Lightly Active'),
            ('moderate', 'Moderately Active'),
            ('active', 'Very Active')
        ],
        default='sedentary'
    )
    goal = models.CharField(
        max_length=20,
        choices=[
            ('lose', 'Lose Weight'),
            ('maintain', 'Maintain Weight'),
            ('gain', 'Gain Weight')
        ],
        default='maintain'
    )
    target_weight_kg = models.FloatField(null=True, blank=True)
    daily_calorie_goal = models.FloatField(null=True, blank=True)

    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    @property
    def bmi(self):
        if self.height_cm and self.weight_kg:
            height_m = self.height_cm / 100
            return round(self.weight_kg / (height_m ** 2), 2)
        return None

    @property
    def weight_diff(self):
        if self.weight_kg is not None and self.target_weight_kg is not None:
            return round(self.target_weight_kg - self.weight_kg, 2)
        return None

    @property
    def stats(self):
        return {
            "age": self.age,
            "gender": self.gender,
            "height_cm": self.height_cm,
            "current_weight": self.weight_kg,
            "target_weight": self.target_weight_kg,
            "weight_difference": self.weight_diff,
            "bmi": self.bmi,
            "activity_level": self.activity_level,
            "goal": self.goal,
            "calorie_goal": self.daily_calorie_goal,
        }