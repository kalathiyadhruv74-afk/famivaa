from rest_framework import status, generics, permissions, filters, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q
from .models import BusinessProfile, MedicineCategory, Medicine, ContactEnquiry
from .serializers import (
    UserSerializer, RegisterSerializer, BusinessProfileSerializer,
    MedicineCategorySerializer, MedicineSerializer, ContactEnquirySerializer,
    AdminContactEnquirySerializer
)
from .permissions import IsAdminUserOrReadOnly, IsOwnerOrAdmin
from .throttling import LoginRateThrottle, ContactRateThrottle

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            return Response({
                'message': 'Registration successful.',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        email_raw = request.data.get('email', '').strip()
        email = email_raw.lower()
        password = request.data.get('password', '')

        if not email or not password:
            return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = None

        # 1. Try direct authenticate by exact username
        user = authenticate(username=email_raw, password=password)
        if not user and email_raw != email:
            user = authenticate(username=email, password=password)
        
        # 2. Try iexact username search
        if not user:
            try:
                user_obj = User.objects.get(username__iexact=email)
                if user_obj.check_password(password):
                    user = user_obj
            except (User.DoesNotExist, User.MultipleObjectsReturned):
                pass

        # 3. Try iexact email search
        if not user:
            try:
                user_obj = User.objects.get(email__iexact=email)
                if user_obj.check_password(password):
                    user = user_obj
            except (User.DoesNotExist, User.MultipleObjectsReturned):
                pass

        # 4. Handle legacy brand email fallback (admin@femiva.com -> admin@famivaa.com)
        if not user and email in ('admin@femiva.com', 'admin@famivaa.com'):
            try:
                user_obj = User.objects.get(email__iexact='admin@famivaa.com')
                if user_obj.check_password(password):
                    user = user_obj
            except User.DoesNotExist:
                pass

        if user is None:
            return Response({'error': 'Invalid email or password. Please verify your login credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({'error': 'This account has been deactivated. Please contact support.'}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data
        return Response({
            'message': 'Login successful.',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user_data
        })

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        profile = getattr(request.user, 'profile', None)
        if not profile:
            profile = BusinessProfile.objects.create(
                user=request.user,
                full_name=request.data.get('full_name', request.user.username),
                company_name=request.data.get('company_name', 'Health Business'),
                phone=request.data.get('phone', ''),
                city=request.data.get('city', ''),
                state=request.data.get('state', '')
            )
        serializer = BusinessProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(request.user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = MedicineCategory.objects.all()
    serializer_class = MedicineCategorySerializer
    pagination_class = None

class MedicineListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = MedicineSerializer

    def get_queryset(self):
        queryset = Medicine.objects.filter(is_active=True).select_related('category')
        
        category_slug = self.request.query_params.get('category', None)
        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)
            
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(brand_name__icontains=search_query) |
                Q(generic_name__icontains=search_query) |
                Q(composition__icontains=search_query) |
                Q(indications__icontains=search_query)
            )

        dosage_form = self.request.query_params.get('dosage_form', None)
        if dosage_form and dosage_form != 'all':
            queryset = queryset.filter(dosage_form__iexact=dosage_form)

        is_featured = self.request.query_params.get('featured', None)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)

        return queryset

class MedicineDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Medicine.objects.filter(is_active=True)
    serializer_class = MedicineSerializer
    lookup_field = 'slug'

class ContactEnquiryCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactEnquirySerializer
    throttle_classes = [ContactRateThrottle]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)

class UserEnquiriesListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContactEnquirySerializer

    def get_queryset(self):
        return ContactEnquiry.objects.filter(user=self.request.user)

# --- Admin APIs ---

class AdminMedicineViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = MedicineSerializer
    queryset = Medicine.objects.all()

class AdminEnquiryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AdminContactEnquirySerializer
    queryset = ContactEnquiry.objects.all()

class AdminUsersListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        users = User.objects.all().select_related('profile').order_by('-date_joined')
        data = UserSerializer(users, many=True).data
        return Response(data)

    def patch(self, request):
        user_id = request.data.get('user_id')
        is_active = request.data.get('is_active')
        if user_id is None or is_active is None:
            return Response({'error': 'user_id and is_active are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            target_user = User.objects.get(id=user_id)
            if target_user.is_superuser:
                return Response({'error': 'Superusers cannot be deactivated.'}, status=status.HTTP_400_BAD_REQUEST)
            target_user.is_active = is_active
            target_user.save()
            return Response({'message': f'User active status updated to {is_active}'})
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
