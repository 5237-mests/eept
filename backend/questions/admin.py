"""
Register Models on admin panel
"""

from django.contrib import admin
from .models import Job, Question, ExamResult, ExamCandidates


admin.site.register(Job)
admin.site.register(Question)
admin.site.register(ExamResult)
admin.site.register(ExamCandidates)
