from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from api.models import BusinessProfile, MedicineCategory, Medicine, ContactEnquiry

class FamivaaApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create category
        self.category = MedicineCategory.objects.create(
            name="Tablets",
            slug="tablets",
            description="Oral tablet formulations"
        )
        
        # Create medicine
        self.medicine = Medicine.objects.create(
            brand_name="Famipres 500",
            slug="famipres-500",
            generic_name="Aceclofenac & Paracetamol",
            composition="Aceclofenac 100mg + Paracetamol 325mg",
            strength="425mg",
            dosage_form="Tablet",
            packaging="10x10 Strip",
            category=self.category,
            short_description="Analgesic formulation",
            description="Detailed description of Famipres 500",
            indications="Pain relief",
            is_active=True
        )

        # Create user
        self.user = User.objects.create_user(
            username="doctor@test.com",
            email="doctor@test.com",
            password="DoctorPassword123"
        )
        self.profile = BusinessProfile.objects.create(
            user=self.user,
            full_name="Dr. Test User",
            company_name="Test Clinic",
            business_type="clinic",
            phone="+91 99999 88888",
            city="Mumbai",
            state="Maharashtra"
        )

    def test_category_list_api(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)

    def test_medicine_list_api(self):
        response = self.client.get('/api/medicines/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_medicine_detail_api(self):
        response = self.client.get(f'/api/medicines/{self.medicine.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['brand_name'], 'Famipres 500')

    def test_contact_enquiry_submission(self):
        payload = {
            'full_name': 'Dr. Test Contact',
            'company_name': 'Test Hospital',
            'business_type': 'hospital',
            'email': 'purchasing@testhospital.org',
            'phone': '+91 98888 77777',
            'city': 'Delhi',
            'state': 'Delhi',
            'medicine_name_text': 'Famipres 500',
            'message': 'Looking for bulk pricing'
        }
        response = self.client.post('/api/contact/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactEnquiry.objects.count(), 1)

    def test_login_api(self):
        payload = {
            'email': 'doctor@test.com',
            'password': 'DoctorPassword123'
        }
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
