# Cabinet BMC — Plateforme Web

Plateforme web pour le **Cabinet BMC** (Business Marketing & Coaching), specialise en Developpement et Animation Commerciale au Benin.

## Architecture

- **Backend** : Django 5.1 + Django REST Framework 3.15 + PostgreSQL 16
- **Frontend** : Next.js 14 + React + TypeScript + Tailwind CSS
- **Deploiement** : Docker Compose + Nginx

## Structure du projet

```
BMC/
├── backend/                 # API Django
│   ├── apps/               # 10 modules Django
│   │   ├── accounts/       # Utilisateurs, authentification
│   │   ├── core/           # Parametres du site, hero, partenaires
│   │   ├── services/       # Catalogue de services
│   │   ├── enterprises/    # Demandes et devis entreprises
│   │   ├── talents/        # Profils, opportunites, candidatures
│   │   ├── academy/        # Formations BMC Academy
│   │   ├── blog/           # Articles et categories
│   │   ├── portfolio/      # Realisations
│   │   ├── contact/        # Messages de contact
│   │   └── diagnostic/     # Diagnostic commercial
│   ├── config/             # Settings Django (base/dev/prod)
│   └── requirements/       # Dependances Python
├── frontend/               # Application Next.js
│   └── src/
│       ├── app/            # Pages (App Router)
│       ├── components/     # Composants reutilisables
│       ├── lib/            # API, auth, types
│       └── providers/      # AuthProvider
├── nginx/                  # Configuration Nginx
├── docker-compose.yml      # Production
└── docker-compose.dev.yml  # Developpement
```

## Demarrage rapide

### Prerequis

- Python 3.12+
- Node.js 20+
- PostgreSQL 16+
- Docker & Docker Compose (optionnel)

### Developpement local (sans Docker)

**Backend :**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
# .venv\Scripts\activate    # Windows
pip install -r requirements/dev.txt

# Configurer la base de donnees PostgreSQL
cp .env.example .env
# Editer .env avec vos parametres

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Frontend :**

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Avec Docker

```bash
cp .env.example .env
# Editer .env avec vos parametres

# Developpement
docker compose -f docker-compose.dev.yml up --build

# Production
docker compose up --build -d
```

## API

Toutes les routes sont sous `/api/v1/` :

| Endpoint | Description |
|---|---|
| `/api/v1/auth/` | Authentification (register, token, profile) |
| `/api/v1/services/` | Catalogue de services (lecture seule) |
| `/api/v1/enterprises/` | Demandes de prestation et devis |
| `/api/v1/talents/` | Profils, opportunites, candidatures |
| `/api/v1/academy/` | Formations et inscriptions |
| `/api/v1/blog/` | Articles et categories |
| `/api/v1/portfolio/` | Realisations |
| `/api/v1/contact/` | Messages de contact |
| `/api/v1/diagnostic/` | Diagnostic commercial |
| `/api/v1/core/` | Parametres du site |

Admin : `/admin/` (interface en francais)

## Tests

```bash
cd backend
pip install -r requirements/dev.txt
pytest
```

## Securite

- JWT avec rotation des tokens
- Rate limiting (30 req/min anonyme, 60 auth, 3/min contact)
- CORS configure par environnement
- HTTPS force en production (HSTS, secure cookies)
- Upload fichiers : PDF uniquement, 5 Mo max, noms UUID
- Mots de passe : validation Django (8 chars min, complexite)
- Headers securite : X-Frame-Options DENY, CSP, XSS filter

## Contacts

- **Telephone** : +229 91 47 41 41 / +229 58 99 31 77 / +229 96 34 75 77
- **Email** : cabinetbmc20@gmail.com
