from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import Employee


# Register your models to be controlled with django admin panel

class CustomUserAdmin(UserAdmin):
    model = Employee
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('username', 'email', 'password', "first_name")})
    )


admin.site.register(Employee, UserAdmin)
