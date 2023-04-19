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

# Get one planet details route
@planet_routes.route('/<int:id>')
def get_one_planet(id):
    planet = Planet.query.get(id)
    return planet.to_dict()

# Create a planet route
@planet_routes.route('/', methods=["POST"])
def create_planet():
    user = current_user.to_dict()
    form = PlanetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if user.admin:
        if form.validate_on_submit():

            new_planet = Planet(
            name = form.data["name"],
            description = form.data["description"],
            distance_from_earth_km = form.data["distance_from_earth_km"],
            mass_measured_in_earths = form.data["mass_measured_in_earths"],
            volume_measured_in_earths = form.data["volume_measured_in_earths"],
            mean_density_in_g_cm_cubed = form.data["mean_density_in_g_cm_cubed"],
            surface_gravity_in_m_squared = form.data["surface_gravity_in_m_squared"],
            escape_velocity_in_km_per_sec = form.data["escape_velocity_in_km_per_sec"],
            synodic_rotation_period_in_days = form.data["synodic_rotation_period_in_days"],
            temperature_in_k = form.data["temperature_in_k"]
            )
            db.session.add(new_planet)
            db.session.commit()
            return {"planet": new_planet.to_dict()}
        if form.errors:
            return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": "User is not an admin"}

