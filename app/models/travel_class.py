from .db import db, environment, SCHEMA, add_prefix_for_prod

class TravelClass(db.Model):
    __tablename__ = 'travel_classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # # relationships
    # spacecraft_seats = db.relationship(
    #     'SpacecraftSeat',
    #     back_populates='travel_class'
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price
        }
    