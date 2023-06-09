from .db import db, environment, SCHEMA, add_prefix_for_prod

class Wallet(db.Model):
    __tablename__ = 'wallets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    address = db.Column(db.String(100), nullable=False)
    funds = db.Column(db.Float, nullable=False)

    # relationships
    user = db.relationship(
        'User',
        back_populates='wallet'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'address': self.address,
            'funds': self.funds
        }