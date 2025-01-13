from django.contrib import admin
from django.urls import path, include
from project.views import CustomRegisterView, CustomConfirmEmailView, account_inactive_view

urlpatterns = [
    path('dj-rest-auth/registration/', CustomRegisterView.as_view(), name='custom_register'),
    path(
        'dj-rest-auth/registration/account-confirm-email/<key>/',
        CustomConfirmEmailView.as_view(),
        name='account_confirm_email',
    ),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('account-inactive/', account_inactive_view, name='account_inactive'),
    path('admin/', admin.site.urls),
    path('', include('project.urls')),
]
