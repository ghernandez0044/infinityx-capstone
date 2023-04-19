from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Spaceport

class SpaceportForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description')
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    lat = FloatField('latitude')
    lng = FloatField('longitude')