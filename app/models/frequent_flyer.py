from .db import db, environment, SCHEMA, add_prefix_for_prod

class FrequentFlyer(db.Model):
    __tablename__ = 'frequent_flyers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    tier_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tiers.id')))
    account_no = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Float, nullable=False)

    # relationships
    user = db.relationship(
        'User',
        back_populates='membership'
    )

    tier = db.relationship(
        'Tier',
        back_populates='membership'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tier_id': self.tier_id,
            'account_no': self.account_no,
            'points': self.points
        }