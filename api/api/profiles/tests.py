from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

class ProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="password123"
        )

    def test_profile_creation(self):
        profile = Profile.objects.create(
            user=self.user,
            age=25,
            gender="male",
            height_cm=180,
            weight_kg=75,
            activity_level="moderate",
            goal="maintain",
            target_weight_kg=75,
            daily_calorie_goal=2500,
            bio="Just testing!"
        )

        profile_from_db = Profile.objects.get(user=self.user)

        self.assertEqual(profile_from_db.user.username, "testuser")
        self.assertEqual(profile_from_db.age, 25)
        self.assertEqual(profile_from_db.gender, "male")
        self.assertEqual(profile_from_db.goal, "maintain")
        self.assertEqual(profile_from_db.daily_calorie_goal, 2500)
        self.assertEqual(str(profile_from_db), "testuser's Profile")

    def test_profile_user_relation(self):
        profile = Profile.objects.create(user=self.user)
        self.assertEqual(self.user.profile, profile)
