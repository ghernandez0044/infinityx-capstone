from .db import db, environment, SCHEMA, add_prefix_for_prod

class FlightStatus(db.Model):
    __tablename__ = 'flight_status'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(100), nullable=False)
    updated_at = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'updated_at': self.updated_at
        }