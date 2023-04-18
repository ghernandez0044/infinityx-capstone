from app.models import db, User, Planet, Wallet, Spaceport, FrequentFlyer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_frequent_flyers():
    flyer1 = FrequentFlyer(
       user_id = 1,
       tier_id = 5,
       account_no = 273209227,
       points =  300_000
    )
    flyer2 = FrequentFlyer(
       user_id = 2,
       tier_id = 7,
       account_no = 877451400,
       points =  1_000_000
    )
    flyer3 = FrequentFlyer(
       user_id = 3,
       tier_id = 2,
       account_no = 663399967,
       points =  6_000
    )
    flyer4 = FrequentFlyer(
       user_id = 4,
       tier_id = 3,
       account_no = 585802202,
       points =  4_000
    )
    flyer5 = FrequentFlyer(
       user_id = 5,
       tier_id = 4,
       account_no = 921426103,
       points =  150_000
    )
    flyer6 = FrequentFlyer(
       user_id = 6,
       tier_id = 2,
       account_no = 202418500,
       points =  5_000
    )
    flyer7 = FrequentFlyer(
       user_id = 7,
       tier_id = 1,
       account_no = 406984843,
       points =  0
    )

    db.session.add(flyer1)
    db.session.add(flyer2)
    db.session.add(flyer3)
    db.session.add(flyer4)
    db.session.add(flyer5)
    db.session.add(flyer6)
    db.session.add(flyer7)
    db.session.commit()


def undo_frequent_flyers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.frequent_flyers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM frequent_flyers"))

    db.session.commit() 
    