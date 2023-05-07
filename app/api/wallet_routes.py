# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Wallet
from ..forms import WalletForm

wallet_routes = Blueprint('wallets', __name__)

# Get all wallets route
@wallet_routes.route('/')
def get_all_wallets():
    all_wallets = Wallet.query.all()
    return [wallet.to_dict() for wallet in all_wallets]

# Get one wallet route
@wallet_routes.route('/<int:id>')
def get_one_wallet(id):
    one_wallet = Wallet.query.get(id)
    return one_wallet.to_dict()

