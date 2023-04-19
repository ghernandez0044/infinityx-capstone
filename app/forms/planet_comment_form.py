from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import PlanetComment

class PlanetCommentForm(FlaskForm):
    content = StringField('content')