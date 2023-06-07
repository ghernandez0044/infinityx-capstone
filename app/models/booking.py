from .db import db, environment, SCHEMA, add_prefix_for_prod

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    flight_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('flights.id')))
    created_at = db.Column(db.String(100), nullable=False)

    # relationships
    user = db.relationship(
        'User',
        back_populates='bookings'
    )

    flight = db.relationship(
        'Flight',
        back_populates='bookings'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'flight_id': self.flight_id,
            'createdAt': self.created_at
        }