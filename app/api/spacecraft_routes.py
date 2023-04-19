# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, Spacecraft

spacecraft_routes = Blueprint('spacecrafts', __name__)

# Get all spacecraft route
@spacecraft_routes.route('/')
def get_all_spacecraft():
    all_spacecraft = Spacecraft.query.all()
    return [spacecraft.to_dict() for spacecraft in all_spacecraft]
