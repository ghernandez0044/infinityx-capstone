from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Wallet

class WalletForm(FlaskForm):
    funds = IntegerField('funds', validators=[DataRequired()])