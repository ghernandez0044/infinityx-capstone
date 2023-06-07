from app.models import db, User, Planet, Wallet, Spaceport, FrequentFlyer, TravelClass, environment, SCHEMA
from sqlalchemy.sql import text

def seed_travel_class():
    class1 = TravelClass(
        name = 'Base Class',
        description = 'With Base class, you will be traveling in a standard seat',
        price_usd = 6_250
    )
    class2 = TravelClass(
        name = 'Cruise Class',
        description = 'With Cruise Class, you will be traveling in a standard-plus seat and will recieve 1 star for every 100 dollars spent',
        price_usd = 7_250
    )
    class3 = TravelClass(
        name = 'Launch Class',
        description = 'With Launch Class, you will be traveling in a premium seat and will recieve 1 star for every 50 dollars spent',
        price_usd = 9_250
    )

    db.session.add(class1)
    db.session.add(class2)
    db.session.add(class3)
    db.session.commit()


def undo_travel_class():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.travel_classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM travel_classes"))

    db.session.commit() 
