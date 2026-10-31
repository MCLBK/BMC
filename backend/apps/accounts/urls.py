from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.ThrottledTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path("password/change/", views.PasswordChangeView.as_view(), name="password_change"),
]
