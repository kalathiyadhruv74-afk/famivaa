from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, LoginView, MeView,
    CategoryListView, MedicineListView, MedicineDetailView,
    ContactEnquiryCreateView, UserEnquiriesListView,
    AdminMedicineViewSet, AdminEnquiryViewSet, AdminUsersListView
)

router = DefaultRouter()
router.register(r'admin/medicines', AdminMedicineViewSet, basename='admin-medicines')
router.register(r'admin/enquiries', AdminEnquiryViewSet, basename='admin-enquiries')

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/me/', MeView.as_view(), name='auth-me'),

    # Public Catalog & Categories
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('medicines/', MedicineListView.as_view(), name='medicine-list'),
    path('medicines/<slug:slug>/', MedicineDetailView.as_view(), name='medicine-detail'),

    # Contact / Enquiries
    path('contact/', ContactEnquiryCreateView.as_view(), name='contact-create'),
    path('user/enquiries/', UserEnquiriesListView.as_view(), name='user-enquiries'),

    # Admin Management Endpoints
    path('admin/users/', AdminUsersListView.as_view(), name='admin-users'),
    path('', include(router.urls)),
]
