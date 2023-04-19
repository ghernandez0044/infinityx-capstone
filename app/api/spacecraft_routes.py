# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, Spacecraft
from ..forms import SpacecraftForm

spacecraft_routes = Blueprint('spacecrafts', __name__)

# Get all spacecraft route
@spacecraft_routes.route('/')
def get_all_spacecraft():
    all_spacecraft = Spacecraft.query.all()
    return [spacecraft.to_dict() for spacecraft in all_spacecraft]

# Get one spacecraft details route
@spacecraft_routes.route('/:id')
def get_one_spacecraft():
    one_spacecraft = Spacecraft.query.get(id).one()
    return one_spacecraft.to_dict()

# Create a spacecraft route
@spacecraft_routes.route('/spacecraft', methods=['POST'])
def create_spacecraft():
    user = current_user.to_dict()
    form = SpacecraftForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if user.admin:
        if form.validate_on_submit():
            new_spacecraft = Spacecraft(
                user_id = user["id"],
                model = form.data["model"],
                load_capacity_kg = form.data["load_capacity_kg"],
                description = form.data["description"],
                height_m = form.data["height_m"],
                diameter_m = form.data["diameter_m"],
                mass_kg = form.data["mass_kg"],
                capsule_volume_m = form.data["capsule_volume_m"],
                trunk_volume_m = form.data["trunk_volume_m"]
            )
            db.session.add(new_spacecraft)
            db.session.commit()
            return {"spacecraft": new_spacecraft, "user": new_spacecraft.user.to_dict()}
        if form.errors:
            return {"message": "form errors", "errors": f"{form.errors}"}
        return {"message": "bad data or user is not an admin"}
