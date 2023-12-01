# Generated by Django 3.2.2 on 2023-11-30 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamemodel',
            name='game_tag',
            field=models.TextField(blank=True, help_text='Game description'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='user_email',
            field=models.EmailField(help_text='User E-mail', max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='user_nickname',
            field=models.CharField(help_text='User nickname', max_length=30, unique=True),
        ),
    ]
