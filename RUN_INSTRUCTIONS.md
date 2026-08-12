# Famivaa Healthcare B2B Web Application - Run Instructions

Complete step-by-step guide to run, test, and deploy the **Famivaa Healthcare** B2B pharmaceutical website locally and in production.

---

## 📋 System Requirements

- **Python**: Version 3.10+ (Tested on Python 3.14)
- **Node.js**: Version 18+ & `npm` 10+
- **Database**: SQLite (default for instant local setup) or PostgreSQL (configured via `.env`)

---

## 📁 Project Architecture Overview

```text
femisite/
├── backend/                  # Django REST Framework Backend
│   ├── api/                  # Django app (Models, Views, Serializers, Seed Data)
│   ├── femiva_backend/       # Django Settings & URLs
│   ├── venv/                 # Python Virtual Environment
│   ├── db.sqlite3            # Local Database
│   ├── manage.py             # Django CLI Utility
│   ├── requirements.txt      # Python Dependencies
│   └── .env                  # Backend Secrets & Database Settings
├── frontend/                 # React 18 + Tailwind CSS Frontend
│   ├── src/                  # React Components, Context, & Pages
│   ├── public/               # Static assets, robots.txt, sitemap.xml
│   ├── package.json          # Node Dependencies & Scripts
│   ├── vite.config.js        # Vite Configuration with API Proxy
│   └── tailwind.config.js    # Healthcare Design System Configuration
└── RUN_INSTRUCTIONS.md       # This instruction guide
```

---

## 🚀 Quick Start (Running Both Servers)

### Terminal 1: Start Django Backend (Port 8000)

```powershell
# Navigate to backend directory
cd backend

# Option A: Windows PowerShell (Using existing venv)
venv\Scripts\python manage.py runserver 8000

# Option B: Git Bash / Linux / macOS
source venv/bin/activate
python manage.py runserver 8000
```
> The Django REST API will be accessible at: **`http://127.0.0.1:8000/api/`**

---

### Terminal 2: Start React Frontend (Port 3000)

```powershell
# Navigate to frontend directory
cd frontend

# Start React Vite development server
npm run dev
```
> The React web application will be accessible at: **`http://localhost:3000/`**

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Features & Access |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin@famivaa.com` | `Admin@12345` | Access to Executive Admin Console (`/admin-dashboard`), Product CRUD, Inquiry Status Updates, User Account Controls |
| **B2B Client (Doctor)** | `doctor@apolloclinic.com` | `Doctor@12345` | B2B Partner Dashboard (`/dashboard`), Business Profile, Order Inquiry Tracking |

---

## ⚙️ Initial First-Time Setup Instructions

If setting up on a fresh machine, execute the following setup commands:

### Step 1: Backend Setup & Database Seeding

1. Open PowerShell or Terminal in `backend/`:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   ```
3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Perform Database Migrations:
   ```bash
   python manage.py makemigrations api
   python manage.py migrate
   ```
5. Seed realistic B2B products, categories, and demo user accounts:
   ```bash
   python manage.py seed_data
   ```

---

### Step 2: Frontend Setup

1. Open a new Terminal in `frontend/`:
   ```bash
   cd frontend
   ```
2. Install Node packages:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

---

## 🧪 Testing & Building

### Running Django Automated Unit Tests
```bash
cd backend
venv\Scripts\python manage.py test api
```

### Running Frontend Production Build Verification
```bash
cd frontend
npm run build
```

---

## 🌐 Application URLs Map

- **Home Page**: `http://localhost:3000/`
- **About Us Page**: `http://localhost:3000/about`
- **Medicines Catalogue**: `http://localhost:3000/medicines`
- **Medicine Details**: `http://localhost:3000/medicines/:slug`
- **B2B Product Inquiry**: `http://localhost:3000/contact`
- **Login Page**: `http://localhost:3000/login`
- **Register Page**: `http://localhost:3000/register`
- **B2B User Dashboard**: `http://localhost:3000/dashboard`
- **Admin Dashboard**: `http://localhost:3000/admin-dashboard`
- **Django Native Admin**: `http://127.0.0.1:8000/django-admin/`
