from django.contrib import admin
from .models import BusinessProfile, MedicineCategory, Medicine, ContactEnquiry

@admin.register(BusinessProfile)
class BusinessProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'company_name', 'business_type', 'phone', 'city', 'state')
    search_fields = ('company_name', 'full_name', 'user__email', 'phone')
    list_filter = ('business_type', 'state')

@admin.register(MedicineCategory)
class MedicineCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('brand_name', 'generic_name', 'category', 'dosage_form', 'strength', 'is_active', 'is_featured')
    list_filter = ('is_active', 'is_featured', 'category', 'dosage_form')
    search_fields = ('brand_name', 'generic_name', 'composition', 'indications')
    prepopulated_fields = {'slug': ('brand_name',)}

@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'full_name', 'business_type', 'email', 'phone', 'status', 'created_at')
    list_filter = ('status', 'business_type', 'created_at')
    search_fields = ('company_name', 'full_name', 'email', 'phone', 'message')
    readonly_fields = ('created_at',)
