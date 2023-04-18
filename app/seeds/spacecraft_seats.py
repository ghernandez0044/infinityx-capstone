from app.models import db, User, Planet, Wallet, Spaceport, FrequentFlyer, SpacecraftSeat, environment, SCHEMA
from sqlalchemy.sql import text

def seed_spacecraft_seats():
    seat1 = SpacecraftSeat(
        spacecraft_id = 1,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat2 = SpacecraftSeat(
        spacecraft_id = 1,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat3 = SpacecraftSeat(
        spacecraft_id = 1,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat4 = SpacecraftSeat(
        spacecraft_id = 1,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat5 = SpacecraftSeat(
        spacecraft_id = 1,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat6 = SpacecraftSeat(
        spacecraft_id = 1,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat7 = SpacecraftSeat(
        spacecraft_id = 2,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat8 = SpacecraftSeat(
        spacecraft_id = 2,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat9 = SpacecraftSeat(
        spacecraft_id = 2,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat10 = SpacecraftSeat(
        spacecraft_id = 2,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat11 = SpacecraftSeat(
        spacecraft_id = 2,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat12 = SpacecraftSeat(
        spacecraft_id = 2,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat13 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat14 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat15 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat16 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat17 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat18 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat19 = SpacecraftSeat(
        spacecraft_id = 4,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat20 = SpacecraftSeat(
        spacecraft_id = 4,
        travel_class_id = 1,
        price_usd = 6_250
    )
    seat21 = SpacecraftSeat(
        spacecraft_id = 4,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat22 = SpacecraftSeat(
        spacecraft_id = 4,
        travel_class_id = 2,
        price_usd = 7_250
    )
    seat23 = SpacecraftSeat(
        spacecraft_id = 4,
        travel_class_id = 3,
        price_usd = 9_250
    )
    seat24 = SpacecraftSeat(
        spacecraft_id = 3,
        travel_class_id = 3,
        price_usd = 9_250
    )

    db.session.add(seat1)
    db.session.add(seat2)
    db.session.add(seat3)
    db.session.add(seat4)
    db.session.add(seat5)
    db.session.add(seat6)
    db.session.add(seat7)
    db.session.add(seat8)
    db.session.add(seat9)
    db.session.add(seat10)
    db.session.add(seat11)
    db.session.add(seat12)
    db.session.add(seat13)
    db.session.add(seat14)
    db.session.add(seat15)
    db.session.add(seat16)
    db.session.add(seat17)
    db.session.add(seat18)
    db.session.add(seat19)
    db.session.add(seat20)
    db.session.add(seat21)
    db.session.add(seat22)
    db.session.add(seat23)
    db.session.add(seat24)
    db.session.commit()
    

def undo_spacecraft_seats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spacecraft_seats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spacecraft_seats"))

    db.session.commit()