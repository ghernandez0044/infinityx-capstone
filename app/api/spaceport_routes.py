# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, Spaceport
from ..forms import SpaceportForm

spaceport_routes = Blueprint('spaceports', __name__)

