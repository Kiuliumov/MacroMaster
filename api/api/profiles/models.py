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
    workouts_completed = models.PositiveIntegerField(null=True, blank=True)

    # Reset
    water_consumed = models.FloatField(null=True, blank=True, default=0)
    streak = models.PositiveIntegerField(null=True, blank=True)
    calories_consumed = models.PositiveIntegerField(null=True, blank=True)
    calories_burnt = models.PositiveIntegerField(null=True, blank=True)

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
    def current_deficit(self):
        if self.daily_calorie_goal is None or self.calories_consumed is None:
            return None

        calories_burnt = self.calories_burnt or 0

        return (self.daily_calorie_goal + calories_burnt) - self.calories_consumed

    @property
    def stats(self):
        calories_consumed = self.calories_consumed or 0
        calories_burnt = self.calories_burnt or 0
        calorie_goal = self.daily_calorie_goal or 0

        current_deficit = None
        if calorie_goal:
            current_deficit = (calorie_goal + calories_burnt) - calories_consumed

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
            "profile_picture": self.profile_picture.url if self.profile_picture else None,
            "bio": self.bio,

            # Daily stats
            "water_consumed": self.water_consumed or 0,
            "calorie_goal": calorie_goal,
            "calories_consumed": calories_consumed,
            "calories_burnt": calories_burnt,
            "current_deficit": current_deficit,

            # Progress stats
            "streak": self.streak or 0,
            "workouts_completed": self.workouts_completed or 0,
        }