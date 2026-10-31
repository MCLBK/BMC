#!/usr/bin/env bash
set -o errexit

pip install --upgrade pip
pip install -r requirements/prod.txt

python manage.py collectstatic --noinput
python manage.py migrate --noinput

# Creer le superuser si les variables sont definies
if [ -n "$DJANGO_SUPERUSER_USERNAME" ]; then
  python manage.py createsuperuser --noinput || true
fi
