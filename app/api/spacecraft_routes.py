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
@spacecraft_routes.route('/<int:id>')
def get_one_spacecraft(id):
    one_spacecraft = Spacecraft.query.get(id)
    return one_spacecraft.to_dict()

# Create a spacecraft route
@spacecraft_routes.route('/', methods=["POST"])
def create_spacecraft():
    user = current_user
    form = SpacecraftForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if user.admin:
        if form.validate_on_submit():
            new_spacecraft = Spacecraft(
                model = form.data["model"],
                year = form.data["year"],
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
            return {"spacecraft": new_spacecraft.to_dict()}
        if form.errors:
            return {"message": "form errors", "errors": f"{form.errors}"}
        return {"message": "bad data or user is not an admin"}
    
# Update a spacecraft route    
@spacecraft_routes.route('/<int:id>', methods=["PATCH", "PUT"])
def update_spacecraft(id):
    user = current_user
    spacecraft = Spacecraft.query.get(id)

    if user.admin:
        form = SpacecraftForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            spacecraft.model = form.data["model"]
            spacecraft.year = form.data["year"]
            spacecraft.load_capacity_kg = form.data["load_capacity_kg"]
            spacecraft.description = form.data["description"]
            spacecraft.height_m = form.data["height_m"]
            spacecraft.diameter_m = form.data["diameter_m"]
            spacecraft.mass_kg = form.data["mass_kg"]
            spacecraft.capsule_volume_m = form.data["capsule_volume_m"]
            spacecraft.trunk_volume_m = form.data["trunk_volume_m"]
            db.session.commit()
            updated_spacecraft = Spacecraft.query.get(id)
            return {"spacecraft": updated_spacecraft.to_dict()}
        if form.errors:
            return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
        
    return {"message": "User is not an admin"}


# Delete a spacecraft route
@spacecraft_routes.route('/<int:id>', methods=["DELETE"])
def delete_spacecraft(id):
    user = current_user
    spacecraft = Spacecraft.query.get(id)
    if user.admin and spacecraft:
        db.session.delete(spacecraft)
        db.session.commit()
        return {"message": "Spacecraft Deleted!"}
    return {"message": "spacecraft not found or user is not an admin"}
