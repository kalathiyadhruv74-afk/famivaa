from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BusinessProfile, MedicineCategory, Medicine, ContactEnquiry

class BusinessProfileSerializer(serializers.ModelSerializer):
    business_type_display = serializers.CharField(source='get_business_type_display', read_only=True)

    class Meta:
        model = BusinessProfile
        fields = ['full_name', 'company_name', 'business_type', 'business_type_display', 'phone', 'city', 'state']

class UserSerializer(serializers.ModelSerializer):
    profile = BusinessProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser', 'profile']

class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)
    company_name = serializers.CharField(write_only=True)
    business_type = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)
    city = serializers.CharField(write_only=True)
    state = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'company_name', 'business_type', 'phone', 'city', 'state']

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        
        BusinessProfile.objects.create(
            user=user,
            full_name=validated_data['full_name'],
            company_name=validated_data['company_name'],
            business_type=validated_data['business_type'],
            phone=validated_data['phone'],
            city=validated_data['city'],
            state=validated_data['state']
        )
        return user

class MedicineCategorySerializer(serializers.ModelSerializer):
    medicine_count = serializers.SerializerMethodField()

    class Meta:
        model = MedicineCategory
        fields = ['id', 'name', 'slug', 'description', 'icon', 'medicine_count']

    def get_medicine_count(self, obj):
        return obj.medicines.filter(is_active=True).count()

class MedicineSerializer(serializers.ModelSerializer):
    category_details = MedicineCategorySerializer(source='category', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=MedicineCategory.objects.all(), source='category', write_only=True, required=False, allow_null=True
    )
    effective_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Medicine
        fields = [
            'id', 'brand_name', 'slug', 'generic_name', 'composition', 'strength',
            'dosage_form', 'packaging', 'category', 'category_details', 'category_id',
            'short_description', 'description', 'indications', 'storage_information',
            'manufacturer', 'marketer', 'prescription_required', 'image', 'image_url',
            'effective_image_url', 'is_active', 'is_featured', 'created_at', 'updated_at'
        ]

    def get_effective_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"

class ContactEnquirySerializer(serializers.ModelSerializer):
    medicine_details = MedicineSerializer(source='medicine', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ContactEnquiry
        fields = [
            'id', 'full_name', 'company_name', 'business_type', 'email', 'phone',
            'city', 'state', 'medicine', 'medicine_name_text', 'medicine_details',
            'message', 'status', 'status_display', 'created_at'
        ]
        read_only_fields = ['status', 'created_at']

class AdminContactEnquirySerializer(serializers.ModelSerializer):
    medicine_details = MedicineSerializer(source='medicine', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ContactEnquiry
        fields = [
            'id', 'full_name', 'company_name', 'business_type', 'email', 'phone',
            'city', 'state', 'medicine', 'medicine_name_text', 'medicine_details',
            'message', 'status', 'status_display', 'created_at'
        ]
