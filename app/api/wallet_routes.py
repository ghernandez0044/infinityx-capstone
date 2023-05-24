# Necessary imports
from flask import Blueprint, request
from flask_login import current_user, login_required
from secrets import token_hex

from ..models import db, Wallet
# from ..forms import WalletForm

wallet_routes = Blueprint('wallets', __name__)

# Get all wallets route
@wallet_routes.route('/')
def get_all_wallets():
    all_wallets = Wallet.query.all()
    return [wallet.to_dict() for wallet in all_wallets]

# Get one wallet route
@wallet_routes.route('/<int:userId>')
def get_one_wallet(userId):
    one_wallet = Wallet.query.filter(Wallet.user_id == userId).first()
    return one_wallet.to_dict()

# Create a wallet route 
@wallet_routes.route('/', methods=["POST"])
def create_wallet():
    user = current_user
    new_wallet = Wallet(
        user_id = user.id,
        address = token_hex(16),
        funds = 0
    )
    db.session.add(new_wallet)
    db.session.commit()
    return {"wallet": new_wallet.to_dict()}

# # Update a wallet route
# @wallet_routes.route('/<int:id>', methods=["PATCH", "PUT"])
# def update_wallet(id):
#     user = current_user
#     wallet = Wallet.query.get(id)

#     if wallet:
#         if wallet.user_id == user.id:
#             form = WalletForm()
#             form["csrf_token"].data = request.cookies["csrf_token"]

#             if form.validate_on_submit():
#                 wallet.funds = form.data['funds']
#                 db.session.commit()
#                 updated_wallet = Wallet.query.get(id)
#                 return {"wallet": updated_wallet.to_dict()}
#             if form.errors:
#                 return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
#         return {"mesage": "Wallet does not belong to this user"}
#     return {"message": "Wallet is not found"}

# Delete a wallet route
@wallet_routes.route('/<int:id>', methods=["DELETE"])
def delete_wallet(id):
    user = current_user
    wallet = Wallet.query.get(id)
    if wallet:
        if wallet.user_id == user.id:
            db.session.delete(wallet)
            db.session.commit()
            return {"message": "Wallet deleted!"}
        return {"message": "Wallet does not belong to this user"}
    return {"message": "Wallet is not found"}
