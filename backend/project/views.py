from allauth.account.views import ConfirmEmailView
from dj_rest_auth.registration.views import RegisterView
from project.serializers import CustomRegisterSerializer
from allauth.account.models import EmailConfirmation, EmailAddress
from django.views.generic.base import TemplateResponseMixin
from django.http import JsonResponse, HttpResponse
from django.template.response import TemplateResponse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.contrib.sites.models import Site

import logging
logger = logging.getLogger(__name__)

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def create(self, request, *args, **kwargs):
        print("DEBUG: Eingehende Registrierungsdaten: ", request.data)
        return super().create(request, *args, **kwargs)

class CustomConfirmEmailView(ConfirmEmailView):
    template_name = 'account/email_confirmed.html'

    def get(self, request, *args, **kwargs):
        print("DEBUG: CustomConfirmEmailView was called!")
        try:
            confirmation = self.get_object()
            confirmation.confirm(request)
            print("DEBUG: Email succesful confirmed!")

            user = confirmation.email_address.user
            user.is_active = True
            user.save()

            context = {
                "message": "Your email has been successfully confirmed! You can now log in"
            }
            return render(request, self.template_name, context)
        except Exception as e:
            print(f"DEBUG: Error in CustomConfirmEmailView: {e}")
            context = {
                "message": "An error has occurred. The confirmation link is invalid or expired."
            }
            return render(request, self.template_name, context)

def account_inactive_view(request):
    return JsonResponse({"error": "Your account is inactive. Please confirm your email to activate it."}, status=403)

def index(request):
    return render(request, 'index.html')
