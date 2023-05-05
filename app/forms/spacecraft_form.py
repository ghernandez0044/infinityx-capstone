from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Spacecraft

class SpacecraftForm(FlaskForm):
    model = StringField('model', validators=[DataRequired()])
    year = IntegerField('year', validators=[DataRequired(), NumberRange(min=2015, max=2200)])
    load_capacity_kg = IntegerField('load_capacity_kg', validators=[DataRequired(), NumberRange(min=2_000, max=250_000)])
    description = TextAreaField('description', validators=[DataRequired()])
    height_m = FloatField('height_m', validators=[DataRequired(), NumberRange(min=1, max=200)])
    diameter_m = FloatField('diameter_m', validators=[DataRequired(), NumberRange(min=1, max=100)])
    mass_kg = FloatField('mass_kg', validators=[DataRequired(), NumberRange(min=10, max=10_000_000)])
    capsule_volume_m = FloatField('capsule_volume_m', validators=[DataRequired(), NumberRange(min=1, max=100)])
    trunk_volume_m = FloatField('trunk_volume_m', validators=[DataRequired(), NumberRange(min=10, max=100)])
