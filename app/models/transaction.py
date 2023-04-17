from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    seat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spacecraft_seats.id')))
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    tax_percentage = db.Column(db.Float, nullable=False)
    tax_total = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'seat_id': self.seat_id,
            'quantity': self.quantity,
            'unit_price': self.unit_price,
            'tax_percentage': self.tax_percentage,
            'tax_total': self.tax_total,
            'total': self.total,
            'created_at': self.created_at
        }