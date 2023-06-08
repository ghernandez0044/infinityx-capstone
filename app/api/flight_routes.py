# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

from ..models import db, Flight

flight_routes = Blueprint('flights', __name__)

# Get all flights route
@flight_routes.route('/')
def get_all_flights():
    all_flights = Flight.query.all()
    return [flight.to_dict() for flight in all_flights]

# Get one flight details route
@flight_routes.route('/<int:id>')
def get_one_flight(id):
    flight = Flight.query.get(id)
    return flight.to_dict()