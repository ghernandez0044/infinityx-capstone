from .db import db, environment, SCHEMA, add_prefix_for_prod

class Schedule(db.Model):
    __tablename__ = 'schedules'

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

