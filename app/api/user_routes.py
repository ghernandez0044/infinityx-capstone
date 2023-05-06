from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, PlanetComment, FrequentFlyer, Wallet, Transaction

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
    return {**user.to_dict(), "membership": user.membership[0].to_dict(), "wallet": user.wallet[0].to_dict(), "transactions": [transaction.to_dict() for transaction in user.transactions], "planet_comments": [comment.to_dict() for comment in user.planet_comments]}

# NEW CODE FROM BELOW ON OUT

# Get all planet comments for current user
@user_routes.route('<int:id>/comments')
def get_user_comments(id):
    user_comments = PlanetComment.query.filter(PlanetComment.user_id == id).all()
    if user_comments:
        return {"comments": [comment.to_dict() for comment in user_comments], "count": PlanetComment.query.filter(PlanetComment.user_id == id).count()}
    return {"message": "user has no comments"}


