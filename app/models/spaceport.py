from .db import db, environment, SCHEMA, add_prefix_for_prod

class Spaceport(db.Model):
    __tablename__ = 'spaceports'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    # relationships
    # flights = db.relationship(
    #     'Flight',
    #     back_populates='spaceport',
    #     cascade="all, delete-orphan"
    # )

    # launching_schedules = db.relationship(
    #     'Schedule',
    #     back_populates='launch_spaceport',
    #     foreign_keys="Schedule.launch_spaceport_id"
    # )

    # landing_schedules = db.relationship(
    #     'Schedule',
    #     back_populates='landing_spaceport',
    #     foreign_keys="Schedule.landing_spaceport_id"
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'city': self.city,
            'state': self.state,
            'lat': self.lat,
            'lng': self.lng,
        }

    

    