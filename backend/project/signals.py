from django.dispatch import receiver
from allauth.account.signals import user_signed_up
from allauth.account.utils import send_email_confirmation
import logging
logger = logging.getLogger(__name__)

@receiver(user_signed_up)
def disable_user_after_signup(request, user, **kwargs):
    logger.debug(f"Disabling user: {user.username}")
    user.is_active = False
    user.save()

    send_email_confirmation(request, user)
