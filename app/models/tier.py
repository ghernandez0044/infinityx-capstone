from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tier(db.Model):
    __tablename__ = 'tiers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    perks = db.Column(db.String(100), nullable=False, unique=True)

    # relationships
    membership = db.relationship(
        'FrequentFlyer',
        back_populates='tier'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'perks': self.perks
        }