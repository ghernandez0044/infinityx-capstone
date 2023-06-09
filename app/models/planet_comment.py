from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlanetComment(db.Model):
    __tablename__ = 'planet_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    planet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('planets.id')))
    content = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.String(255), nullable=False)

    # relationships
    user = db.relationship(
        'User',
        back_populates='planet_comments'
    )

    planet = db.relationship(
        'Planet',
        back_populates='planet_comments'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'planet_id': self.planet_id,
            'content': self.content
        }
