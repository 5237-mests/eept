from rest_framework import generics
from users.models import Employee
from datetime import datetime
import random
import csv
import json
from .serializer import (
    ExamResultSerializer,
    EmployeeSerializer,
    HomePageSerializer,
    JobSerializer,
    ExamCandidateSerializer,
    ExamResultSerializer,
    QuesionSerializer,
    )
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from users.models import Employee
from .models import Job, Question, ExamResult, ExamCandidates
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from users.models import ActivationTokenGenerator
from users.serializers import ActivationTokenSerializer
from users.utils import SendActivationEmail


class UserGetByUserNameAPIVIew(generics.RetrieveAPIView):
    """Get User by username"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get(self, request, *args, **kwargs):
        """override get method to get user by user name"""
        try:
            queryset = Employee.objects.filter(
                username=kwargs.get("username")).first()
            serializer = EmployeeSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {"status": "No User Found"}, status=status.HTTP_404_NOT_FOUND)


# create user or list all users


class UserListCreateView(generics.ListCreateAPIView):
    """Create User / List All users"""
    authentication_classes = [SessionAuthentication]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminUser]

    def get_permissions(self):
        """ if create user allow any (sign up)"""
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        return [perm() for perm in self.permission_classes]

    def post(self, request, *args, **kwargs):
        """Create user on post """
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            password = request.data.get("password")
            user = Employee.objects.create(**request.data)
            user.set_password(password)
            user.save()
            token = ActivationTokenGenerator.objects.create(user=user).token
            SendActivationEmail({"token": str(token),
                                 "email": user.email,
                                 "user_id": user.username,
                                 "firstname": user.first_name})
            user_ser = EmployeeSerializer(user)
            return Response(user_ser.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobListCreateAPIView(generics.ListCreateAPIView):
    """List create Job"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobUpdateDeleteGetAPIVIew(generics.RetrieveUpdateDestroyAPIView):
    """get/update/delete job by pk"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer


# List Questions by Job id

class QuestionListAPIViewByJobID(generics.ListAPIView):
    """"""
    serializer_class = QuesionSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """get all question for specific JOB Code"""
        queryset = Question.objects.filter(job__pk=self.kwargs["pk"])
        if not queryset:
            return Response(
                {"status": "No Question Found"},
                status=status.HTTP_404_NOT_FOUND)
        job = Job.objects.get(pk=self.kwargs["pk"])
        queryset = random.sample(list(queryset), k=job.totalquestions)
        serializer = QuesionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# List all Questions in db or create one


class QuestionListCreateAPIView(generics.ListCreateAPIView):
    """List-Create Question"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuesionSerializer


# to create new Exam result data only
class ExamResultListCreateView(generics.ListCreateAPIView):
    """List-Create Exam results """
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        return [perm() for perm in self.permission_classes]

    def post(self, request, *args, **kwargs):
        """create exam result on submit of exam"""
        us = json.loads(request.data.get("userAnswer"))
        selected = [key.split("_")[1] for key in us]
        correctAns = Question.objects.filter(
            job__pk=request.data.get("job")).filter(pk__in=selected)
        total = Job.objects.get(pk=request.data.get("job")).totalquestions
        ans = {f"question_{q.id}": q.ans for q in correctAns}
        score = 0.0
        for key, val in us.items():
            if val == ans[key]:
                score += 1
        instance = ExamResult.objects.create(
            user=Employee.objects.filter(
                username=request.data.get("user")).first(),
            job=Job.objects.get(pk=request.data.get("job")),
            userAnswer=request.data.get("userAnswer"),
            score=score, total=total)
        instance.save()
        serializer = ExamResultSerializer(instance)
        return Response(serializer.data)


# Get all Exam Results for specific User
class ExamResultsForUserAPIView(generics.GenericAPIView):
    """Get all available exams for a user"""
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    queryset = ExamResult.objects.all()

    def get(self, request, *args, **kwargs):
        """get all exams a user can seat for"""
        queryset = ExamResult.objects.filter(
            user__username=kwargs["username"]).all()
        if not queryset:
            return Response([])
        serializer = ExamResultSerializer(queryset, many=True)
        return Response(serializer.data)


class ExamEligbleGetAPIView(generics.GenericAPIView):
    """check if user is eligble for specific job"""
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    queryset = ExamResult.objects.all()

    def get(self, request, *args, **kwargs):
        """retrieve user and job from exam cand list if exist"""
        userid = kwargs.get("userid", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        querset = ExamResult.objects.filter(
            user__username=userid, job__pk=jobid).first()
        if not querset:
            return Response(
                {"can:": "Take exam"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamResultSerializer(querset)
        return Response(serializer.data, status=status.HTTP_200_OK)


# exam result for one user or one job
class ExamResultSingleAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Get exam results for a user for specific job"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer

    def get(self, request, *args, **kwargs):
        """get specific exam result for a user"""
        userid = kwargs.get("username", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        querset = ExamResult.objects.filter(
            user__username=userid, job__pk=jobid).first()
        if not querset:
            return Response(
                {"can:": "Take exam"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamResultSerializer(querset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """delete specific exam result for a user"""
        userid = kwargs.get("username", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        queryset = ExamResult.objects.filter(
            user__username=userid, job__pk=jobid).first()
        queryset.delete()
        return Response({})


class ExamResultsPerJobAdminView(generics.RetrieveUpdateDestroyAPIView):
    """Get all exam results for specific job for admin"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer(many=True)

    def get(self, request, *args, **kwargs):
        """Get all exam results for specific job for admin"""
        queryset = ExamResult.objects.filter(job__pk=self.kwargs["pk"])
        if not queryset:
            return Response(
                {"status": "No Result Found For the Job"},
                status=status.HTTP_404_NOT_FOUND)
        serializer = ExamResultSerializer(queryset, many=True)
        return Response(serializer.data)


# List all Exam Candidates or create one
class ExamCandiateListCreateView(generics.ListCreateAPIView):
    """Create exam candidates"""
    authentication_classes = [SessionAuthentication]
    permission_classes = []
    queryset = ExamCandidates.objects.all()
    serializer_class = ExamCandidateSerializer


# insert many exam candidates at once
class ExamCandidateBulkInsertView(generics.GenericAPIView):
    """Bulk update exam candidate by Admin"""
    permission_classes = [IsAdminUser]
    authentication_classes = [SessionAuthentication]
    queryset = ExamCandidates.objects.all()

    def post(self, request, *args, **kwargs):
        """Bulk update exam candidate by Admin"""
        payload = request.data
        empIds = [id.strip() for id in payload.get("empId").split(",")]
        empIds = [id for id in empIds if id and " " not in id]
        employees = [str(emp.username) for emp in Employee.objects.all()]
        empIds = [id for id in empIds if id in employees]
        try:
            job = Job.objects.get(pk=payload.get("job", None))
        except Job.DoesNotExist:
            return Response(
                {"Job": "Not Exist"}, status=status.HTTP_404_NOT_FOUND)
        for emp in empIds:
            try:
                ExamCandidates.objects.create(
                    user=Employee.objects.filter(username=emp).first(),
                    job=job,
                    examDate=datetime(payload.get("year", 2050),
                                      payload.get("month", 1),
                                      payload.get("day", 1),
                                      payload.get("hour", 3),
                                      payload.get("minute", 1),
                                      payload.get("second", 10))
                                      )
            except Exception:
                return Response({"error": "Occur in creation"})
        examcand = ExamCandidates.objects.all()
        serializer = ExamCandidateSerializer(examcand, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get all Exams A User can seat for, not yet taken

class ExamAvailableListView(generics.GenericAPIView):
    """Get all available exams a user can seat for"""
    queryset = ExamCandidates.objects.all()
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """Get all available exams a user can seat for"""
        queryset = ExamCandidates.objects.filter(
            user__username=kwargs["username"], exam_taken=False)
        if not queryset:
            return Response({"detail": "Not Found"},
                            status=status.HTTP_404_NOT_FOUND)
        serializer = ExamCandidateSerializer(queryset, many=True)
        return Response(serializer.data)


# update Exam Aavailablity as Taken when user take exam

class UpdateCandidateExamTaken(generics.GenericAPIView):
    """update exam cand list when user complete exam"""
    serializer_class = ExamCandidateSerializer()
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request, *args, **kwargs):
        userid = kwargs.get("username", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.filter(username=userid).first()
        job = Job.objects.get(pk=jobid)
        cand = ExamCandidates.objects.filter(
            user__username=userid, job__pk=jobid).first()
        if cand is None:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        cand.exam_taken = True
        cand.save()
        serializer = ExamCandidateSerializer(cand)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class ExcelUploadView(generics.GenericAPIView):
    """Bulk Question create class"""
    permission_classes = [IsAdminUser]
    authentication_classes = [SessionAuthentication]
    queryset = Question.objects.all()

    def post(self, request, *args, **kwargs):
        """Save Bulk Question"""
        csv_file = request.FILES.get('file')
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        objs = [
            Question(
                text=row['text'],
                cha=row['cha'],
                chb=row['chb'],
                chc=row['chc'],
                chd=row['chd'],
                ans=row['ans'],
                job=Job.objects.filter(jobCode=row['job']).first(),
            )
            for row in reader
        ]
        Question.objects.bulk_create(objs)
        return Response(status=200)
    
# from django.template import loader
# from django.http import HttpResponse
# def home(request):
#     "Home page /"
#     template = loader.get_template('home.html')
#     return HttpResponse(template.render())
