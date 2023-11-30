from django.db import models

class UserModel(models.Model):
    user_nickname = models.CharField(help_text="User nickname", max_length=30, blank=False, null=False)
    user_password = models.CharField(help_text="User password", max_length=30, blank=False, null=False)
    user_email = models.EmailField(help_text="User E-mail", blank=False, null=False)
    created_date = models.DateTimeField(help_text="Created Date time", auto_now_add=True)

class GameModel(models.Model):
    game_name = models.CharField(help_text="Game name", max_length=100, blank=False, null=False)
    game_description = models.TextField(help_text="Game description", blank=True, null=False)
    created_date = models.DateTimeField(help_text="Created Date time", auto_now_add=True)

# Create your models here.