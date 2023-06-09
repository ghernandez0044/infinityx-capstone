# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
import json
import datetime

from ..models import db, Booking


booking_routes = Blueprint('bookings', __name__)

# Get all bookings route
@booking_routes.route('/')
def get_all_bookings():
    all_bookings = Booking.query.all()
    return [booking.to_dict() for booking in all_bookings]

# Get one booking details route
@booking_routes.route('/<int:id>')
def get_one_booking(id):
    one_booking = Booking.query.get(id)
    return one_booking.to_dict()

# Create a booking route
@booking_routes.route('/', methods=["POST"])
def create_booking():
    user = current_user
    booking_data = request.get_data().decode('utf-8')
    formatted_data = json.loads(booking_data)
    if user:
        new_booking = Booking(
          user_id = user.id,
          flight_id = formatted_data['flight_id'],
          created_at =  datetime.datetime.now().strftime('%Y-%m-%d') 
        )
    return {"message": 'no user logged in'}