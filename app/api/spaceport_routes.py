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

# Get one spaceport details route
@spaceport_routes.route('/<int:id>')
def get_one_spaceport(id):
    one_spaceport = Spaceport.query.get(id)
    return one_spaceport.to_dict()

# Create a spaceport route
@spaceport_routes.route('/', methods=["POST"])
def create_spaceport():
    user = current_user.to_dict()
    form = SpaceportForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if user.admin:
        if form.validate_on_submit():
            new_spaceport = Spaceport(
                name = form.data["name"],
                description = form.data["description"],
                city = form.data["city"],
                state = form.data["state"],
                lat = form.data["lat"],
                lng = form.data["lng"]
            )
            db.session.add(new_spaceport)
            db.session.commit()
            return {"spaceport": new_spaceport.to_dict()}
        if form.errors:
            return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": "user is not an admin"}


# Update a spaceport route
@spaceport_routes.route('/<int:id>', methods=["PATCH", "PUT"])
def update_spaceport(id):
    user = current_user.to_dict()
    spaceport = Spaceport.query.get(id)

    if user.admin:
        if spaceport:
            form = SpaceportForm()
            form["csrf_token"].data = request.cookies["csrf_token"]

            if form.validate_on_submit():
                spaceport.name = form.data["name"]
                spaceport.description = form.data["description"]
                spaceport.city = form.data["city"]
                spaceport.state = form.data["state"]
                spaceport.lat = form.data["lat"]
                spaceport.lng = form.data["lng"]
                db.session.commit()
                updated_spaceport = Spaceport.query.get(id)
                return {"spaceport": update_spaceport.to_dict()}
            if form.errors:
                return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": "user is not an admin"}
