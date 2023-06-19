from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, RadioField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def coerce_bool(x):
    if isinstance(x, str):
        return x == "True" if x != "None" else None
    else:
        return bool(x) if x is not None else None


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message='email needs to be valid')])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    admin = RadioField('admin', choices=[(False, 'false'), (True, 'true')])
    phone = StringField('phone', validators=[DataRequired()])
    profile_pic = StringField('profile_pic')
    passport = StringField('passport', validators=[DataRequired()])

