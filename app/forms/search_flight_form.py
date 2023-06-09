from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Spacecraft

class SearchFlightForm():
    orbit = StringField('orbit')
    date = StringField('date')
    mass = IntegerField('mass')
    travel_class = StringField('travel_class')