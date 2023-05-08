# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from ..models import db, PlanetComment
from ..forms import PlanetCommentForm

planet_comment_routes = Blueprint('planet_comments', __name__)

# Get all comments route
@planet_comment_routes.route('/')
def get_all_planet_comments():
    all_comments = PlanetComment.query.all()
    return [comment.to_dict() for comment in all_comments]

# Get all comments for one planet route
@planet_comment_routes.route('/planet/<int:id>')
def get_one_planet_all_comments(id):
    all_planet_comments = PlanetComment.query.filter(PlanetComment.planet_id == id).all()
    return [comment.to_dict() for comment in all_planet_comments]

# Get one comment details route
@planet_comment_routes.route('/<int:id>')
def get_one_comment(id):
    one_comment = PlanetComment.query.get(id)
    if one_comment:
        return one_comment.to_dict()
    return {"message": "planet comment not found"}


# Update a planet comment route
@planet_comment_routes.route('<int:id>', methods=["PATCH", "PUT"])
def update_planet_comment(id):
    user = current_user
    planet_comment = PlanetComment.query.get(id)

    if planet_comment:
        form = PlanetCommentForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if planet_comment.user_id == user.id:
            if form.validate_on_submit():
                planet_comment.content = form.data["content"]
                db.session.commit()
                updated_planet_comment = PlanetComment.query.get(id)
                return {"planet_comment": updated_planet_comment.to_dict()}
            if form.errors:
                return {"message": "form errors", "errors": f"{form.errors}"}
        return {"message": "this comment does not belong to this user"}
    return {"message": "planet comment not found"}

# Delete a planet comment route
@planet_comment_routes.route('/<int:id>', methods=["DELETE"])
def delete_planet_comment(id):
    user = current_user
    planet_comment = PlanetComment.query.get(id)

    if planet_comment:
        if planet_comment.user_id == user.id:
            db.session.delete(planet_comment)
            db.session.commit()
            return {"message": "Planet Comment Deleted!"}
        return {"message": "Comment does not belong to this user"}
    return {"message": "Comment not found"}