from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class ProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(message='email needs to be valid')])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    profile_pic = StringField('profile_pic')
    passport = StringField('passport', validators=[DataRequired()])

