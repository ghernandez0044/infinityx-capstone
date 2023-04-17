from .db import db, environment, SCHEMA, add_prefix_for_prod

class Planet(db.Model):
    __tablename__ = 'planets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    distance_from_earth_km = db.Column(db.Float)
    mass_measured_in_earths = db.Column(db.Float)
    volume_measured_in_earths = db.Column(db.Float)
    mean_density_in_g_cm_cubed = db.Column(db.Float)
    surface_gravity_in_m_squared = db.Column(db.Float)
    escape_velocity_in_km_per_sec = db.Column(db.Float)
    synodic_rotation_period_in_days = db.Column(db.Float)
    temperature_in_k = db.Column(db.Float)

    # relationships
    planet_comments = db.relationship(
        'PlanetComment',
        back_populates='planets'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'distance_from_earth_km': self.distance_from_earth_km,
            'mass_measured_in_earths': self.mass_measured_in_earths,
            'volume_measured_in_earths': self.volume_measured_in_earths,
            'mean_density_in_g_cm_cubed': self.mean_density_in_g_cm_cubed,
            'surface_gravity_in_m_squared': self.surface_gravity_in_m_squared,
            'escape_velocity_in_km_per_sec': self.escape_velocity_in_km_per_sec,
            'synodic_rotation_period_in_days': self.synodic_rotation_period_in_days,
            'temperature_in_k': self.temperature_in_k
        }