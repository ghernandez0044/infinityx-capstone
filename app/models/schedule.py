from .db import db, environment, SCHEMA, add_prefix_for_prod

class Schedule(db.Model):
    __tablename__ = 'schedules'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    launch_spaceport_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spaceports.id')))
    landing_spaceport_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spaceports.id')))
    departure_time = db.Column(db.String(100), nullable=False)
    arrival_time = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'launch_spaceport_id': self.launch_spaceport_id,
            'landing_spaceport_id': self.landing_spaceport_id
        }

