# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, Spaceport
from ..forms import SpaceportForm

spaceport_routes = Blueprint('spaceports', __name__)

# Get all spaceport route
@spaceport_routes.route('/')
def get_all_spaceport():
    all_spaceport = Spaceport.query.all()
    return [spaceport.to_dict() for spaceport in all_spaceport]