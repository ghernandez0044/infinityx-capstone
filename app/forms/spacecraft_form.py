from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Spacecraft

class SpacecraftForm(FlaskForm):
    model = StringField('model', validators=[DataRequired()])
    year = IntegerField('year', validators=[DataRequired()])
    load_capacity_kg = IntegerField('load_capacity_kg', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    height_m = FloatField('height_m', validators=[DataRequired()])
    diameter_m = FloatField('diameter_m', validators=[DataRequired()])
    mass_kg = FloatField('mass_kg', validators=[DataRequired()])
    capsule_volume_m = FloatField('capsule_volume_m', validators=[DataRequired()])
    trunk_volume_m = FloatField('trunk_volume_m', validators=[DataRequired()])
