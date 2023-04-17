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
    flight_status_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('flight_status.id')))
    created_at = db.Column(db.String(100), nullable=False)

    # relationships
    seat = db.relationship(
        'SpacecraftSeat',
        back_populates='flight'
    )

    spacecraft = db.relationship(
        'Spacecraft',
        back_populates='flights'
    )

    flight_status = db.relationship(
        'FlightStatus',
        back_populates='flight',
        foreign_keys='Flight.flight_status_id'
    )

    spaceport = db.relationship(
        'Spaceport',
        back_populates='flights'
    )

    schedule = db.relationship(
        'Schedule',
        back_populates='flight'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'spaceport_id': self.spaceport_id,
            'spacecraft_id': self.spacecraft_id,
            'spacecraft_seat_id': self.spacecraft_seat_id,
            'schedule_id': self.schedule_id,
            'flight_status_id': self.flight_status_id,
            'created_at': self.created_at
        }