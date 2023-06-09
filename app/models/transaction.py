from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    travelclass_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('travel_classes.id')))
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    user_kg = db.Column(db.Float, nullable=False)
    tax_percentage = db.Column(db.Float, nullable=False)
    tax_total = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.String(100), nullable=False)

    # relationships
    user = db.relationship(
        'User',
        back_populates='transactions'
    )

    # seat = db.relationship(
    #     'SpacecraftSeat',
    #     back_populates='transactions'
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'travelclass_id': self.travelclass_id,
            'quantity': self.quantity,
            'user_kg': self.user_kg,
            'unit_price': self.unit_price,
            'tax_percentage': self.tax_percentage,
            'tax_total': self.tax_total,
            'total': self.total,
            'created_at': self.created_at
        }