from .db import db, environment, SCHEMA, add_prefix_for_prod

class Flight(db.Model):
    __tablename__ = 'flights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    launch_spaceport_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spaceports.id')))
    landing_spaceport_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spaceports.id')))
    spacecraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spacecrafts.id')))
    departure_time = db.Column(db.String(100), nullable=False)
    arrival_time = db.Column(db.String(100), nullable=False)
    orbit = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.String(100), nullable=False)

    # # relationships
    # seat = db.relationship(
    #     'SpacecraftSeat',
    #     back_populates='flight'
    # )

    spacecraft = db.relationship(
        'Spacecraft',
        back_populates='flights'
    )

    # flight_status = db.relationship(
    #     'FlightStatus',
    #     back_populates='flight',
    #     foreign_keys='Flight.flight_status_id'
    # )

    # spaceport = db.relationship(
    #     'Spaceport',
    #     back_populates='flights'
    # )

    bookings = db.relationship(
        'Booking',
        back_populates='flight',
        cascade="all, delete-orphan"
    )

    # schedule = db.relationship(
    #     'Schedule',
    #     back_populates='flight'
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'spacecraft_id': self.spacecraft_id,
            'launch_spaceport_id': self.launch_spaceport_id,
            'landing_spaceport_id': self.landing_spaceport_id,
            'departure_time': self.departure_time,
            'arrival_time': self.arrival_time,
            'created_at': self.created_at
        }