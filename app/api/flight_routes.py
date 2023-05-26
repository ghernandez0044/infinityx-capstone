# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

from ..models import db, Flight