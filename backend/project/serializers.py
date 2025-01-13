from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=30, required=True)
    last_name = serializers.CharField(max_length=30, required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        print("DEBUG: CustomRegisterSerializer wurde geladen!")

    def save(self, request):
        user = super().save(request)
        print("DEBUG: First Name:", self.validated_data.get('first_name', ''))
        print("DEBUG: Last Name:", self.validated_data.get('last_name', ''))
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save()
        print(f"DEBUG: User {user.username} saved with First Name: {user.first_name} and Last Name: {user.last_name}")
        return user
