# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, Spacecraft

spacecraft_routes = Blueprint('spacecrafts', __name__)

