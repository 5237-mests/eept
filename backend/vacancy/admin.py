from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import Document


admin.site.register(Document)