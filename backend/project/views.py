from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailConfirmation, EmailAddress
from django.views.generic.base import TemplateResponseMixin
from django.http import JsonResponse, HttpResponse
from django.template.response import TemplateResponse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.contrib.sites.models import Site
import logging

logger = logging.getLogger(__name__)

class CustomConfirmEmailView(ConfirmEmailView):
    template_name = 'account/email_confirmed.html'  

    def get(self, request, *args, **kwargs):
        print("DEBUG: CustomConfirmEmailView gestartet mit Key:", kwargs.get("key"))
        try:
            confirmation = self.get_object()
            print("DEBUG: Confirmation gefunden:", confirmation)
            confirmation.confirm(request)
            print("DEBUG: Benutzer erfolgreich bestätigt")

            user = confirmation.email_address.user
            user.is_active = True
            user.save()

            return JsonResponse({"message": "Email erfolgreich bestätigt"})
        except Exception as e:
            print(f"DEBUG: Fehler in CustomConfirmEmailView: {e}")
            return JsonResponse({"error": str(e)}, status=400)

def test_template_view(request):
    return render(request, 'account/email_confirmed.html', {"message": "Test erfolgreich"})

def account_inactive_view(request):
    logger.debug("Account Inactive View aufgerufen")
    return JsonResponse({"error": "Your account is inactive. Please confirm your email to activate it."}, status=403)

def index(request):
    return render(request, 'index.html')
