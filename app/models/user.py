from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admin = db.Column(db.Boolean, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(12))
    passport = db.Column(db.String(100), nullable=False, default='Earthling')
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.Text)
    created_at = db.Column(db.String(100))

    # relationships
    wallet = db.relationship(
        'Wallet',
        back_populates='user',
        cascade="all, delete-orphan"
    )

    planet_comments = db.relationship(
        'PlanetComment',
        back_populates='user',
        cascade="all, delete-orphan"
    )

    transactions = db.relationship(
        'Transaction',
        back_populates='user',
        cascade="all, delete-orphan"
    )

    membership = db.relationship(
        'FrequentFlyer',
        back_populates='user',
        cascade="all, delete-orphan"
    )

    bookings = db.relationship(
        'Booking',
        back_populates='user',
        cascade="all, delete-orphan"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'admin': self.admin,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'passport': self.passport,
            'profile_pic': self.profile_pic,
            'created_at': self.created_at
        }