from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Planet

class PlanetForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    distance_from_earth_km = FloatField('distance_from_earth_km')
    mass_measured_in_earths = FloatField('mass_measured_in_earths')
    volume_measured_in_earths = FloatField('volume_measured_in_earths')
    mean_density_in_g_cm_cubed = FloatField('mean_density_in_g_cm_cubed')
    surface_gravity_in_m_squared = FloatField('surface_gravity_in_m_squared')
    escape_velocity_in_km_per_sec = FloatField('escape_velocity_in_km_per_sec')
    synodic_rotation_period_in_days = FloatField('synodic_rotation_period_in_days')
    temperature_in_k = FloatField('temperature_in_k')