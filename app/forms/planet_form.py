from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Planet

class PlanetForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    distance_from_earth_km = FloatField('distance_from_earth_km', validators=[DataRequired(), NumberRange(min=0, max=1_000_000_000)])
    mass_measured_in_earths = FloatField('mass_measured_in_earths', validators=[DataRequired(), NumberRange(min=0, max=100)])
    volume_measured_in_earths = FloatField('volume_measured_in_earths', validators=[DataRequired(), NumberRange(min=0, max=100)])
    mean_density_in_g_cm_cubed = FloatField('mean_density_in_g_cm_cubed', validators=[DataRequired(), NumberRange(min=0, max=100)])
    surface_gravity_in_m_squared = FloatField('surface_gravity_in_m_squared', validators=[DataRequired(), NumberRange(min=0, max=100)])
    escape_velocity_in_km_per_sec = FloatField('escape_velocity_in_km_per_sec', validators=[DataRequired(), NumberRange(min=0, max=100)])
    synodic_rotation_period_in_days = FloatField('synodic_rotation_period_in_days', validators=[DataRequired(), NumberRange(min=0, max=365)])
    temperature_in_k = FloatField('temperature_in_k', validators=[DataRequired(), NumberRange(min=0, max=600)])