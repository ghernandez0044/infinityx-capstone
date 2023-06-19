from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, PlanetComment, FrequentFlyer, Wallet, Transaction, Booking, Flight
from app.forms import SignUpForm, ProfileForm
from ..models import db
import json
import datetime

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    # return user.to_dict()
    print('user: ', user)
    print('user wallet: ', user.wallet)
    return {**user.to_dict(), "wallet": [wallet.to_dict() for wallet in user.wallet], "membership": [membership.to_dict() for membership in user.membership], "transactions": [transaction.to_dict() for transaction in user.transactions], "planet_comments": [comment.to_dict() for comment in user.planet_comments]}

# NEW CODE FROM BELOW ON OUT

# Update a user profile
@user_routes.route('<int:id>/edit', methods=["PATCH", "PUT"])
@login_required
def update_user_profile(id):
    user = current_user
    if current_user:
        if current_user.id == id:
            form = ProfileForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                user.first_name = form.data["first_name"]
                user.last_name = form.data["last_name"]
                user.phone = form.data["phone"]
                user.passport = form.data["passport"]
                user.username = form.data["username"]
                user.email = form.data["email"]
                user.profile_pic = form.data["profile_pic"]
                db.session.commit()
                updated_user = User.query.get(id)
                return updated_user.to_dict()
            if form.errors:
                return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
        return {"message": "Profile does not belong to current user"}
    return {"message": "User is not logged in"}

    

# Get all planet comments for user
@user_routes.route('<int:id>/comments')
def get_user_comments(id):
    user_comments = PlanetComment.query.filter(PlanetComment.user_id == id).all()
    if user_comments:
        return {"comments": [comment.to_dict() for comment in user_comments], "count": PlanetComment.query.filter(PlanetComment.user_id == id).count()}
    return {"message": "user has no comments"}

# Get all bookings for user
@user_routes.route('<int:id>/bookings')
def get_user_bookings(id):
    user_bookings = Booking.query.join(Flight).filter(Booking.user_id == id).all()
    if user_bookings:
        return [booking.to_dict() for booking in user_bookings]
        # return {booking: booking.flight for booking in user_bookings}
    return []

# Create a booking route
@user_routes.route('<int:id>/bookings', methods=["POST"])
def create_booking(id):
    user = current_user
    booking_data = request.get_data().decode('utf-8')
    formatted_data = json.loads(booking_data)
    print('FORMATTED DATA: ---------------------- ', formatted_data)
    if user:
        new_booking = Booking(
          user_id = user.id,
          flight_id = formatted_data['flightId'],
          created_at =  datetime.datetime.now().strftime('%Y-%m-%d') 
        )
        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
    return {"message": 'no user logged in'}

# Get all transactions for user
@user_routes.route('<int:id>/transactions')
def get_user_transactions(id):
    user_transactions = Transaction.query.filter(Transaction.user_id == id).all()
    if user_transactions:
        return [transaction.to_dict() for transaction in user_transactions]
    return []

# Create a transaction route
@user_routes.route('<int:id>/transactions', methods=["POST"])
def create_transaction(id):
    user = current_user
    transaction_data = request.get_data().decode('utf-8')
    formatted_data = json.loads(transaction_data)
    if user:
        new_transaction = Transaction(
            user_id = user.id,
            travelclass_id = formatted_data['travelclass_id'],
            quantity = formatted_data['quantity'],
            unit_price = formatted_data['unit_price'],
            user_kg = formatted_data['user_kg'],
            tax_percentage = formatted_data['tax_percentage'],
            tax_total = formatted_data['tax_total'],
            total = formatted_data['total'],
            created_at = formatted_data['created_at']
        )
        db.session.add(new_transaction)
        db.session.commit()
        return new_transaction.to_dict()
    return {"message": 'no user logged in'}
    





