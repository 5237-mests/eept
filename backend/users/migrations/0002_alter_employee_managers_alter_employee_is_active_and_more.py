# Generated by Django 4.1.7 on 2023-03-30 18:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="employee",
            managers=[
                ("objects", users.models.CustomuserManger()),
            ],
        ),
        migrations.AlterField(
            model_name="employee",
            name="is_active",
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name="ActivationTokenGenerator",
            fields=[
                (
                    "token",
                    models.UUIDField(
                        default=uuid.uuid4,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
