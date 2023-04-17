from .db import db, environment, SCHEMA, add_prefix_for_prod

class SpacecraftSeat(db.Model):
    __tablename__ = 'spacecraft_seats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spacecraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spacecrafts.id')), nullable=False)
    travel_class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('travelclass.id')), nullable=False)
    price_usd = db.Column(db.Float, nullable=False)

    # relationships
    transactions = db.relationship(
        'Transaction',
        back_populates='seat'
    )

    travel_class = db.relationship(
        'TravelClass',
        back_populates='spacecraft_seats'
    )

    flight = db.relationship(
        'Flight',
        back_populates='seat'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'spacecraft_id': self.spacecraft_id,
            'travel_class_id': self.travel_class_id
        }