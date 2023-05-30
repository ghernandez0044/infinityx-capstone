# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
import datetime

from ..models import db, TravelClass

travel_class_routes = Blueprint('travel_classes', __name__)

# Get all travel classes route
@travel_class_routes.route('/')
def get_all_travel_classes():
    all_travel_classes = TravelClass.query.all()
    return [travel_class.to_dict() for travel_class in all_travel_classes]