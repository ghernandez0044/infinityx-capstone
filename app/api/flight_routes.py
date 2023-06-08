# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

from ..models import db, Flight
from ..forms import SearchFlightForm

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

# Search for a flight
@flight_routes.route('/flights/search')
def search_flight():
    user = current_user
    form = SearchFlightForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    desired_orbit = form.data["orbit"]
    earliest_date = form.data["date"]

    available_flights = Flight.query.filter(Flight.orbit.ilike(f"%{desired_orbit}%") ).filter(Flight.departure_time.like(f"%{earliest_date}%"))

    return [flight.to_dict() for flight in available_flights]