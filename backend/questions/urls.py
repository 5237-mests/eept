"""
Question App urls
"""
from django.urls import path
from . import views


app_name = "questions"

urlpatterns = [
    # User CRUD
    path("api/users/", views.UserListCreateView.as_view()),
    path("api/users/<str:username>/",
         views.UserGetByUserNameAPIVIew.as_view()),
    # Job CRUD
    path("api/jobs/", views.JobListCreateAPIView.as_view()),
    path("api/jobs/<int:pk>/",
         views.JobUpdateDeleteGetAPIVIew.as_view()),
    # Question CRUD
    path("api/questions/",
         views.QuestionListCreateAPIView.as_view()),
    path("api/questions/<int:pk>/",
         views.QuestionListAPIViewByJobID.as_view()),
    # Exam Results filter views
    path("api/exam-result/",
         views.ExamResultListCreateView.as_view()),
    path("api/exam-result-per-job/<int:pk>",
         views.ExamResultsPerJobAdminView.as_view()),
    path("api/exam-result/<str:username>/",
         views.ExamResultsForUserAPIView.as_view()),
    path("api/exam-result/<str:username>/<int:jobid>/",
         views.ExamResultSingleAPIView.as_view()),
    # Exam Candidates
    path("api/exam-cand/",  # Get All Candidates or add to candidates
         views.ExamCandiateListCreateView.as_view()),
    path("api/exam-cand/bulk/",  # Add many candidates at once
         views.ExamCandidateBulkInsertView.as_view()),
    path("api/exam-cand/<str:username>/",  # Get all Exams A user reg for
         views.ExamAvailableListView.as_view()),
    path("api/exam-cand-update/<str:username>/<int:jobid>/",
         views.UpdateCandidateExamTaken.as_view()),
    # get update status of exam cand
    path("api/add-questions/", views.ExcelUploadView.as_view()),

]
