from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlanetComment(db.Model):
    __tablename__ = 'pin_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    planet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('planets.id')))
    content = db.Columb(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'planet_id': self.planet_id,
            'content': self.content
        }
