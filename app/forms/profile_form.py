from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class ProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])