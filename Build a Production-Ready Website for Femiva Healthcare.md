# Build a Production-Ready Website for Femiva Healthcare

Create a modern, responsive, secure, and production-ready website for a pharmaceutical company named **Femiva Healthcare**.

Femiva Healthcare is a **B2B pharmaceutical company** that supplies medicines and healthcare products to doctors, clinics, hospitals, medical stores, pharmacies, distributors, and other healthcare businesses.

The company does **NOT sell medicines directly to patients through the website**.

The website must look professional, trustworthy, clean, medical, and corporate.

---

# Technology Stack

Use:

Frontend:
- React
- JavaScript
- Tailwind CSS

Backend:
- Python
- Django
- Django REST Framework

Database:
- PostgreSQL

Authentication:
- Django authentication
- JWT authentication if required for React API communication

Use:
- `.env` for all secrets
- Git-friendly project structure
- REST APIs between frontend and backend

Never hardcode:
- Database passwords
- API keys
- JWT secrets
- Email credentials
- Admin credentials

---

# Main Website Pages

Create the following pages:

1. Home
2. About Us
3. Medicines
4. Medicine Details
5. Contact Us
6. Login
7. Logout
8. User Dashboard
9. Admin Dashboard

Also create:
- 404 page
- Loading states
- Error states

---

# 1. HOME PAGE

Create a professional pharmaceutical company homepage.

Navbar:

Femiva Healthcare logo/name

Navigation:
- Home
- About Us
- Medicines
- Contact Us
- Login

When logged in:

Replace Login with:
- Dashboard
- Logout

Hero section:

Company Name:
**Femiva Healthcare**

Possible headline:

**Healthcare Solutions You Can Trust**

Subheading:

"Delivering quality pharmaceutical products and reliable healthcare solutions to medical professionals and healthcare businesses."

Add buttons:

- Explore Medicines
- Contact Us

Do NOT add:
- Add to Cart
- Buy Now
- Online Medicine Ordering for patients

Create sections for:

## About Femiva Healthcare

Short introduction explaining that Femiva Healthcare provides pharmaceutical products to healthcare professionals and businesses.

## Why Choose Us

Cards such as:

- Quality Products
- Reliable Supply
- Professional Support
- Healthcare Focus
- Trusted Business Relationships

## Featured Medicines

Display selected medicines using cards.

Each medicine card should display:

- Medicine image
- Brand name
- Generic/composition name
- Medicine category
- Short description
- View Details button

Do NOT show online purchase buttons.

## Contact CTA

Example:

"Interested in our pharmaceutical products?"

Buttons:
- Contact Femiva Healthcare
- View Medicines

---

# 2. ABOUT US PAGE

Create a professional About Femiva Healthcare page.

Sections:

## Company Overview

Explain that Femiva Healthcare focuses on providing pharmaceutical products and healthcare solutions to:

- Doctors
- Clinics
- Hospitals
- Medical stores
- Pharmacies
- Healthcare distributors

## Mission

Provide reliable and quality pharmaceutical solutions while maintaining professional relationships with healthcare partners.

## Vision

Build a trusted pharmaceutical brand recognized for quality, reliability, service, and long-term healthcare partnerships.

## Our Values

- Quality
- Trust
- Reliability
- Professionalism
- Healthcare Responsibility

Keep the content professional and avoid making unsupported medical or regulatory claims.

---

# 3. MEDICINES PAGE

Create a professional medicine/product catalogue.

Medicines should come dynamically from the backend database.

Each medicine should contain:

- Brand Name
- Generic Name / Composition
- Product Category
- Dosage Form
- Strength
- Packaging
- Medicine Image
- Short Description
- Detailed Description
- Indications
- Usage information
- Storage information
- Manufacturer / Marketer information
- Prescription requirement if applicable

Example categories:

- Tablets
- Capsules
- Syrups
- Injections
- Supplements
- Dermatology
- Gynecology
- General Medicine
- Other Healthcare Products

Add:

- Search medicines
- Filter by category
- Pagination

Each medicine card:

Medicine Image

Brand Name

Generic / Composition

Category

View Details

Do NOT include:

- Price for patients
- Add to Cart
- Buy Now
- Checkout
- Direct medicine ordering

---

# 4. MEDICINE DETAILS PAGE

Create a separate page for every medicine.

URL example:

`/medicines/product-name`

Display:

- Medicine image
- Brand name
- Generic/composition
- Strength
- Dosage form
- Packaging
- Category
- Description
- Indications
- Important product information
- Storage instructions
- Manufacturer / marketer details

Add a clear disclaimer:

"Product information provided on this website is intended primarily for healthcare professionals and business partners. It should not be considered a substitute for professional medical advice, diagnosis, or treatment."

Add:

**Enquire About This Product**

button.

This should redirect the user to Contact Us with the medicine automatically selected.

---

# 5. CONTACT US PAGE

Create a professional contact form.

Fields:

- Full Name
- Company / Clinic / Medical Store Name
- Business Type
- Email
- Phone Number
- City
- State
- Product Interested In
- Message

Business Type dropdown:

- Doctor
- Clinic
- Hospital
- Medical Store
- Pharmacy
- Distributor
- Healthcare Business
- Other

Save enquiries securely in PostgreSQL.

The admin should be able to see enquiries from the admin dashboard.

Add Femiva Healthcare business contact information.

Use placeholder values until actual company information is provided.

Include:

- Business address
- Phone
- Email
- Office hours

Optional:
- Google Maps section

Do not expose sensitive information.

---

# 6. LOGIN SYSTEM

Implement secure login and logout.

Do not create insecure custom authentication.

Use Django's authentication system.

Users should be able to login using:

- Email
- Password

Only authorized business users should access protected dashboard functionality.

Possible user roles:

- Admin
- Doctor
- Medical Store
- Distributor
- Business Partner

Passwords must:

- Never be stored in plain text
- Use Django password hashing
- Have proper validation

Login should have:

- Email
- Password
- Show/hide password
- Remember me if implemented securely
- Forgot Password
- Login button

Add protection against:

- Brute force login attempts
- Invalid authentication
- Unauthorized dashboard access

---

# 7. LOGOUT

Implement secure logout.

After logout:

- Delete/invalidate authentication token/session correctly.
- Redirect the user to the Home page.
- Protected pages must not remain accessible.

---

# 8. USER DASHBOARD

Logged-in business users should have a simple dashboard.

Display:

- Welcome message
- User name
- Business name
- Business type

Sections:

- Browse Medicines
- My Profile
- Contact / Product Enquiry
- Logout

Do not add purchasing or patient ordering unless explicitly requested later.

---

# 9. ADMIN DASHBOARD

Create a secure admin dashboard.

Admin can:

## Medicine Management

- Add medicine
- Edit medicine
- Delete medicine
- Upload medicine image
- Enable/disable medicine
- Change medicine category

## User Management

- View registered users
- Activate/deactivate users
- View business information

## Enquiry Management

View:

- Customer/business name
- Email
- Phone
- Business type
- Product
- Message
- Date
- Enquiry status

Statuses:

- New
- Contacted
- Completed

Use Django Admin where appropriate instead of rebuilding everything unnecessarily.

Only admin users must have access to admin functionality.

---

# DATABASE MODELS

Create clean Django models.

Suggested models:

## User / BusinessProfile

Fields:

- id
- user
- full_name
- company_name
- business_type
- phone
- city
- state
- created_at
- updated_at

## MedicineCategory

Fields:

- id
- name
- slug

## Medicine

Fields:

- id
- brand_name
- slug
- generic_name
- composition
- strength
- dosage_form
- packaging
- category
- short_description
- description
- indications
- storage_information
- manufacturer
- marketer
- image
- is_active
- created_at
- updated_at

## ContactEnquiry

Fields:

- id
- full_name
- company_name
- business_type
- email
- phone
- city
- state
- medicine
- message
- status
- created_at

Use proper foreign keys and database indexes where necessary.

---

# API STRUCTURE

Example APIs:

Public:

GET `/api/medicines/`

GET `/api/medicines/{slug}/`

GET `/api/categories/`

POST `/api/contact/`

Authentication:

POST `/api/auth/login/`

POST `/api/auth/logout/`

POST `/api/auth/forgot-password/`

Authenticated:

GET `/api/profile/`

PUT `/api/profile/`

Admin:

POST `/api/admin/medicines/`

PUT `/api/admin/medicines/{id}/`

DELETE `/api/admin/medicines/{id}/`

GET `/api/admin/enquiries/`

Never allow users to access admin APIs without proper authorization.

---

# DESIGN REQUIREMENTS

The UI must look like a real pharmaceutical corporate website.

Design style:

- Clean
- Premium
- Healthcare-oriented
- Minimal
- Professional
- Modern
- Trustworthy

Use a mostly:

- White background
- Healthcare blue
- Soft green accents
- Dark readable text

Do not make it overly colorful.

Use:

- Rounded cards
- Subtle shadows
- Professional typography
- Proper spacing
- Smooth hover effects
- Simple animations

Avoid unnecessary animations.

---

# RESPONSIVE DESIGN

Website must work properly on:

- Mobile
- Tablet
- Laptop
- Desktop

Navbar should collapse into a mobile menu.

Medicine cards should automatically adjust to screen size.

Forms must be mobile friendly.

---

# SECURITY REQUIREMENTS

Security is extremely important because this is intended to be a real company website.

Follow these rules strictly:

1. Never hardcode secrets.

2. Store secrets in environment variables.

3. Add `.env` to `.gitignore`.

4. Validate all frontend input again on the backend.

5. Sanitize user input where required.

6. Use Django ORM rather than raw SQL.

7. Protect against:
   - SQL injection
   - XSS
   - CSRF
   - Broken authentication
   - Broken authorization
   - Brute-force attempts

8. Properly configure CORS.

9. Restrict admin endpoints.

10. Never return passwords or secrets through APIs.

11. Restrict uploaded image/file types and sizes.

12. Use HTTPS in production.

13. Use secure cookies/settings in production.

14. Do not show internal server errors to users.

15. Log server errors securely without logging passwords or authentication tokens.

16. Add rate limiting to:
   - Login
   - Password reset
   - Contact form

17. Use Django's built-in security functionality wherever possible rather than creating custom security systems.

---

# SEO

Add SEO metadata.

Each page should have:

- Unique title
- Meta description

Use readable URLs.

Example:

`/about`

`/medicines`

`/medicines/medicine-name`

`/contact`

Add:

- sitemap.xml
- robots.txt
- Open Graph metadata

---

# PERFORMANCE

Optimize:

- Images
- API requests
- Database queries
- React rendering

Use lazy loading where appropriate.

Do not install unnecessary libraries.

---

# ERROR HANDLING

Handle:

- Server unavailable
- Database errors
- API errors
- Invalid login
- Medicine not found
- Unauthorized access
- Invalid forms
- Network failure

Users should see understandable error messages without exposing backend technical information.

---

# DEVELOPMENT RULES

IMPORTANT:

Do not generate the entire project blindly in one massive step.

Build it feature-by-feature.

Order:

1. Project architecture
2. Database setup
3. Django backend
4. Models and migrations
5. Authentication
6. Medicine APIs
7. Contact API
8. React structure
9. Navbar/footer
10. Home
11. About
12. Medicines
13. Medicine Details
14. Contact
15. Login/logout
16. Dashboard
17. Admin functionality
18. Responsive testing
19. Security testing
20. Production configuration

Before modifying working code:

- Understand existing files.
- Do not rewrite unrelated files.
- Do not remove working functionality.
- Do not create duplicate components.
- Keep reusable components.
- Keep the code clean and maintainable.
- Explain important architecture decisions.

After completing each major feature:

- Check for errors.
- Test API responses.
- Test authentication.
- Test permissions.
- Test frontend functionality.
- Test mobile responsiveness.

The final application should be structured so that it can actually be deployed and used by **Femiva Healthcare** as a real B2B pharmaceutical company website.

Do not treat this as a demo/student project.

Build it with production-quality architecture, security, validation, error handling, and maintainability.