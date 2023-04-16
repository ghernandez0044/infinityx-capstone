from .db import db, environment, SCHEMA, add_prefix_for_prod

class Flight(db.Model):
    __tablename__ = 'flights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    spaceport_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spaceports.id')))
    spacecraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spacecrafts.id')))
    spacecraft_seat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spacecraft_seats.id')))
    schedule_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('schedules.id')))
    flight_status_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('schedules.id')))
    created_at = db.Column(db.String(100), nullable=False)