from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

BUSINESS_TYPE_CHOICES = (
    ('doctor', 'Doctor'),
    ('clinic', 'Clinic'),
    ('hospital', 'Hospital'),
    ('medical_store', 'Medical Store'),
    ('pharmacy', 'Pharmacy'),
    ('distributor', 'Distributor'),
    ('healthcare_business', 'Healthcare Business'),
    ('other', 'Other'),
)

ENQUIRY_STATUS_CHOICES = (
    ('new', 'New'),
    ('contacted', 'Contacted'),
    ('completed', 'Completed'),
)

class BusinessProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    business_type = models.CharField(max_length=50, choices=BUSINESS_TYPE_CHOICES, default='medical_store')
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.company_name})"

class MedicineCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='Pill')

    class Meta:
        verbose_name_plural = "Medicine Categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Medicine(models.Model):
    brand_name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    generic_name = models.CharField(max_length=255)
    composition = models.CharField(max_length=255)
    strength = models.CharField(max_length=100)
    dosage_form = models.CharField(max_length=100, help_text="e.g. Tablet, Capsule, Syrup, Injection")
    packaging = models.CharField(max_length=100, help_text="e.g. 10x10 Strips, 100ml Bottle")
    category = models.ForeignKey(MedicineCategory, on_delete=models.SET_NULL, null=True, related_name='medicines')
    short_description = models.TextField()
    description = models.TextField()
    indications = models.TextField(help_text="Primary medical uses / conditions treated")
    storage_information = models.TextField(default="Store in a cool, dry place below 25°C. Protect from direct sunlight.")
    manufacturer = models.CharField(max_length=255, default='Famivaa Healthcare')
    marketer = models.CharField(max_length=255, default='Famivaa Healthcare')
    prescription_required = models.BooleanField(default=True)
    image = models.ImageField(upload_to='medicines/', null=True, blank=True)
    image_url = models.URLField(max_length=500, blank=True, help_text="Fallback web image URL")
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.brand_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.brand_name} ({self.generic_name})"

class ContactEnquiry(models.Model):
    full_name = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    business_type = models.CharField(max_length=50, choices=BUSINESS_TYPE_CHOICES)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    medicine = models.ForeignKey(Medicine, on_delete=models.SET_NULL, null=True, blank=True, related_name='enquiries')
    medicine_name_text = models.CharField(max_length=255, blank=True, help_text="Text format of medicine name if not linked directly")
    message = models.TextField()
    status = models.CharField(max_length=20, choices=ENQUIRY_STATUS_CHOICES, default='new')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='submitted_enquiries')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Contact Enquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"Enquiry by {self.company_name} - {self.full_name} ({self.get_status_display()})"
