from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import BusinessProfile, MedicineCategory, Medicine, ContactEnquiry

class Command(BaseCommand):
    help = 'Seeds database with realistic Famivaa Healthcare B2B pharmaceutical data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting Famivaa Healthcare data seeding..."))

        # 1. Create Superuser (Admin)
        admin_email = "admin@famivaa.com"
        admin_user, created = User.objects.get_or_create(
            username=admin_email,
            defaults={
                'email': admin_email,
                'is_staff': True,
                'is_superuser': True,
                'is_active': True,
                'first_name': 'Famivaa',
                'last_name': 'Admin'
            }
        )
        admin_user.is_active = True
        admin_user.set_password("Admin@12345")
        admin_user.save()
        if created:
            BusinessProfile.objects.create(
                user=admin_user,
                full_name="Famivaa System Administrator",
                company_name="Famivaa Healthcare Pvt Ltd",
                business_type="healthcare_business",
                phone="+91 98765 43210",
                city="Mumbai",
                state="Maharashtra"
            )
            self.stdout.write(self.style.SUCCESS(f"Created Admin user: {admin_email} (Password: Admin@12345)"))

        # 2. Create Sample B2B Client User
        client_email = "doctor@apolloclinic.com"
        client_user, created = User.objects.get_or_create(
            username=client_email,
            defaults={
                'email': client_email,
                'is_staff': False,
                'is_active': True,
                'first_name': 'Dr. Rajesh',
                'last_name': 'Sharma'
            }
        )
        client_user.is_active = True
        client_user.set_password("Doctor@12345")
        client_user.save()
        if created:
            BusinessProfile.objects.create(
                user=client_user,
                full_name="Dr. Rajesh Sharma",
                company_name="Apollo Multi-Specialty Clinic",
                business_type="clinic",
                phone="+91 98111 22334",
                city="New Delhi",
                state="Delhi"
            )
            self.stdout.write(self.style.SUCCESS(f"Created Sample B2B client: {client_email} (Password: Doctor@12345)"))

        # 3. Create Categories
        categories_data = [
            {'name': 'Tablets', 'icon': 'Pill', 'description': 'Precision-dosed oral solid tablets for therapeutic efficacy.'},
            {'name': 'Capsules', 'icon': 'Capsule', 'description': 'Hard gel and softgel capsules engineered for optimal bioavailability.'},
            {'name': 'Syrups & Liquids', 'icon': 'Droplet', 'description': 'Palatable oral syrups and suspensions for pediatric and adult care.'},
            {'name': 'Injections', 'icon': 'Syringe', 'description': 'Sterile parenteral formulations and IV vials for hospital administration.'},
            {'name': 'Gynecology', 'icon': 'HeartPulse', 'description': 'Specialized formulations targeting women health, prenatal, and hormonal support.'},
            {'name': 'Dermatology', 'icon': 'Sparkles', 'description': 'Topical creams, ointments, and dermatological anti-inflammatory agents.'},
            {'name': 'Supplements', 'icon': 'ShieldCheck', 'description': 'Nutraceuticals, multivitamin complexes, and mineral fortifiers.'},
            {'name': 'General Medicine', 'icon': 'Activity', 'description': 'Broad-spectrum antibiotics, analgesics, and gastrointestinal medicines.'},
        ]

        cat_objs = {}
        for cat_info in categories_data:
            cat, _ = MedicineCategory.objects.get_or_create(
                name=cat_info['name'],
                defaults={'icon': cat_info['icon'], 'description': cat_info['description']}
            )
            cat_objs[cat.name] = cat

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(cat_objs)} product categories."))

        # 4. Create Realistic B2B Medicines
        medicines_data = [
            {
                'brand_name': 'Famipres 500',
                'generic_name': 'Paracetamol & Aceclofenac',
                'composition': 'Aceclofenac 100mg + Paracetamol 325mg',
                'strength': '425 mg',
                'dosage_form': 'Tablet',
                'packaging': '10 x 10 Blister Pack',
                'category': cat_objs['Tablets'],
                'short_description': 'Dual-action analgesic and anti-inflammatory formulation for rapid pain relief.',
                'description': 'Famipres 500 combines Aceclofenac and Paracetamol to deliver fast-acting, sustained relief from acute inflammatory conditions, osteoarthritic pain, rheumatoid flare-ups, and post-operative surgical discomfort.',
                'indications': 'Rheumatoid arthritis, osteoarthritis, dental pain, fever, post-traumatic pain, soft tissue inflammation.',
                'storage_information': 'Store below 25°C in a dry place. Keep protected from direct sunlight.',
                'prescription_required': True,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famicef-O 200',
                'generic_name': 'Cefixime Dispersible',
                'composition': 'Cefixime Trihydrate IP eq. to Anhydrous Cefixime 200mg',
                'strength': '200 mg',
                'dosage_form': 'Tablet',
                'packaging': '10 x 10 Aluminum-Aluminum Strip',
                'category': cat_objs['General Medicine'],
                'short_description': 'Potent 3rd generation cephalosporin oral antibiotic.',
                'description': 'Famicef-O 200 is a broad-spectrum 3rd generation cephalosporin indicated for bacterial infections of the respiratory tract, urinary tract, typhoid fever, and uncomplicated gonorrhea.',
                'indications': 'Upper & lower respiratory tract infections, acute otitis media, uncomplicated UTI, typhoid fever.',
                'storage_information': 'Store in cool dry conditions away from moisture.',
                'prescription_required': True,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famigyn Forte',
                'generic_name': 'Elemental Iron, Folic Acid & Zinc',
                'composition': 'Ferrous Ascorbate 100mg + Folic Acid 1.5mg + Zinc Sulphate 22.5mg',
                'strength': '124 mg Active',
                'dosage_form': 'Capsule',
                'packaging': '10 x 15 Softgel Strips',
                'category': cat_objs['Gynecology'],
                'short_description': 'Advanced hematinic supplement for pregnancy & nutritional anemia.',
                'description': 'Famigyn Forte provides maximal iron absorption with minimal GI irritation. Formulated specifically for prenatal, postnatal, and iron-deficiency anemia in women.',
                'indications': 'Pregnancy-induced anemia, lactation support, chronic blood loss, general nutritional debility.',
                'storage_information': 'Store below 25°C. Do not freeze.',
                'prescription_required': False,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1550572017-edf70f440669?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famical-D3 Softgel',
                'generic_name': 'Calcitriol, Calcium Carbonate & Vitamin K2-7',
                'composition': 'Calcium Carbonate 1250mg (eq to 500mg elemental Ca) + Calcitriol 0.25mcg + Vitamin K2-7 45mcg',
                'strength': 'Complex',
                'dosage_form': 'Capsule',
                'packaging': '10 x 1 x 10 Blister',
                'category': cat_objs['Supplements'],
                'short_description': 'High-potency calcium and Vitamin D3 support for bone density.',
                'description': 'Famical-D3 enhances calcium absorption into bone matrices while preventing arterial calcification via Vitamin K2-7 integration. Essential for geriatric bone health and post-menopausal osteoporosis.',
                'indications': 'Osteoporosis, osteopenia, bone fractures, calcium deficiency in elderly patients.',
                'storage_information': 'Store in a cool, dry place. Protect from heat and direct sunlight.',
                'prescription_required': False,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famigut Dry Syrup',
                'generic_name': 'Ofloxacin & Metronidazole Oral Suspension',
                'composition': 'Ofloxacin 50mg + Metronidazole 100mg per 5ml',
                'strength': '150mg/5ml',
                'dosage_form': 'Syrups & Liquids',
                'packaging': '60ml Amber Glass Bottle with Measuring Cap',
                'category': cat_objs['Syrups & Liquids'],
                'short_description': 'Dual antidiarrheal and gastrointestinal anti-infective suspension.',
                'description': 'Famigut Oral Suspension is formulated for rapid gastroenteritis relief, combining Ofloxacin (broad antibiotic) and Metronidazole (antiprotozoal/amoebicidal agent).',
                'indications': 'Bacterial diarrhea, amoebic dysentery, mixed GI infections in pediatric & adult care.',
                'storage_information': 'Store reconstituted suspension in refrigerator and consume within 7 days.',
                'prescription_required': True,
                'is_featured': False,
                'image_url': 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famizole-40 Inj',
                'generic_name': 'Pantoprazole Sodium Parenteral',
                'composition': 'Pantoprazole Sodium Sterile IP eq. to Pantoprazole 40mg',
                'strength': '40 mg Vial',
                'dosage_form': 'Injections',
                'packaging': 'Single Use Glass Vial with WFI Ampoule',
                'category': cat_objs['Injections'],
                'short_description': 'IV Proton Pump Inhibitor for emergency acid control.',
                'description': 'Famizole-40 IV is indicated when oral proton pump inhibitor administration is unviable. Provides immediate suppression of gastric acid production in ICU and clinical emergency settings.',
                'indications': 'Severe GERD, Zollinger-Ellison syndrome, acute upper GI bleeding, prophylaxis for surgical patients.',
                'storage_information': 'Store below 30°C. Protect from light.',
                'prescription_required': True,
                'is_featured': False,
                'image_url': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famiderm Ointment',
                'generic_name': 'Clobetasol Propionate & Neomycin',
                'composition': 'Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w',
                'strength': '15g Tube',
                'dosage_form': 'Dermatology',
                'packaging': '15g Laminated Collapsible Aluminum Tube',
                'category': cat_objs['Dermatology'],
                'short_description': 'Potent anti-inflammatory topical dermatological formulation.',
                'description': 'Famiderm Ointment suppresses recalcitrant dermatoses, eczema, psoriasis, and secondary bacterial skin infections through anti-pruritic corticosteroid and antibiotic coverage.',
                'indications': 'Severe eczema, psoriasis, resistant lichen planus, allergic contact dermatitis.',
                'storage_information': 'Keep tube tightly closed after use. Do not freeze.',
                'prescription_required': True,
                'is_featured': False,
                'image_url': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80'
            },
            {
                'brand_name': 'Famivita Gold',
                'generic_name': 'Multivitamins, Minerals, Ginseng & L-Carnitine',
                'composition': 'Ginseng Extract 42.5mg + L-Carnitine 50mg + 18 Essential Minerals & Vitamins',
                'strength': 'High Potency',
                'dosage_form': 'Capsule',
                'packaging': '30 Softgel Capsules Bottle',
                'category': cat_objs['Supplements'],
                'short_description': 'Premium B2B vitality and stamina enhancer for post-recovery patients.',
                'description': 'Famivita Gold restores physical endurance, boosts cellular metabolism, and replenishes micro-nutrients depleted by prolonged illness, surgery, or chronic fatigue.',
                'indications': 'Convalescence, general debility, chronic fatigue syndrome, immune fortification.',
                'storage_information': 'Store in a dry place protected from sunlight.',
                'prescription_required': False,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80'
            }
        ]

        med_count = 0
        for med_data in medicines_data:
            med, created = Medicine.objects.get_or_create(
                brand_name=med_data['brand_name'],
                defaults=med_data
            )
            if created:
                med_count += 1

        self.stdout.write(self.style.SUCCESS(f"Seeded {med_count} B2B pharmaceutical products."))

        # 5. Create Sample Contact Enquiry
        sample_med = Medicine.objects.first()
        ContactEnquiry.objects.get_or_create(
            email="purchasing@cityhospital.org",
            defaults={
                'full_name': 'Dr. Meera Nambiar',
                'company_name': 'City Care Multi-specialty Hospital',
                'business_type': 'hospital',
                'phone': '+91 98990 11223',
                'city': 'Bengaluru',
                'state': 'Karnataka',
                'medicine': sample_med,
                'medicine_name_text': sample_med.brand_name if sample_med else '',
                'message': 'We are looking to place a bulk B2B inquiry for 500 packs of Famipres 500 for our hospital pharmacy department. Kindly provide pricing and distribution schedule.',
                'status': 'new',
                'user': client_user
            }
        )

        self.stdout.write(self.style.SUCCESS("Famivaa Healthcare database seeding completed successfully!"))
