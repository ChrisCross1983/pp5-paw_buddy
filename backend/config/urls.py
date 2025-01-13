from django.contrib import admin
from django.urls import path, include
from project.views import CustomConfirmEmailView, account_inactive_view, test_template_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('project.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path(
        'dj-rest-auth/registration/account-confirm-email/<key>/',
        CustomConfirmEmailView.as_view(),
        name='account_confirm_email',
    ),
    path('account-inactive/', account_inactive_view, name='account_inactive'),
    path('test-template/', test_template_view, name='test_template'),
]
