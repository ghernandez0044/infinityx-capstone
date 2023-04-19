# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, Planet
from ..forms import PlanetForm

planet_routes = Blueprint('planets', __name__)

# Get all planets route
@planet_routes.route('/')
def get_all_routes():
    all_planets = Planet.query.all()
    return [planet.to_dict() for planet in all_planets]

# Get one planet details page
@planet_routes('/<int:id>')
def get_one_planet(id):
    planet = Planet.query.get(id)
    return planet.to_dict()