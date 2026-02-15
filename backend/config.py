# Configuration file for Risk AI

import os

# Database settings
DATABASE_HOST = os.getenv('DATABASE_HOST', 'localhost')
DATABASE_PORT = int(os.getenv('DATABASE_PORT', 5432))
DATABASE_NAME = os.getenv('DATABASE_NAME', 'risk_ai_db')
DATABASE_USER = os.getenv('DATABASE_USER', 'risk_ai_user')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', 'password')

# Environment settings
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
DEBUG = ENVIRONMENT == 'development'