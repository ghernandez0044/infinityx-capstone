from .db import db, environment, SCHEMA, add_prefix_for_prod

class Spacecraft(db.Model):
    __tablename__ = 'spacecrafts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    load_capacity_kg = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    height_m = db.Column(db.Float, nullable=False)
    diameter_m = db.Column(db.Float, nullable=False)
    mass_kg = db.Column(db.Float, nullable=False)
    capsule_volume_m = db.Column(db.Float, nullable=False)
    trunk_volume_m = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'model': self.model,
            'year': self.year,
            'load_capacity_kg': self.load_capacity_kg,
            'description': self.description,
            'height_m': self.height_m,
            'diameter_m': self.diameter_m,
            'mass_kg': self.mass_kg,
            'capsule_volume_m': self.capsule_volume_m,
            'trunk_volume_m': self.trunk_volume_m
        }
    