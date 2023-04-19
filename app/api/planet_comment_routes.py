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

# Get one comment details route
@planet_comment_routes.route('/<int:id>')
def get_one_comment(id):
    one_comment = PlanetComment.query.get(id)
    if one_comment:
        return one_comment.to_dict()
    return {"message": "planet comment not found"}
