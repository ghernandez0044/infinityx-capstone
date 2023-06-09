from app.models import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bookings():
    booking1 = Booking(
       user_id = 1,
       flight_id = 1,
       created_at = '2022-10-01' 
    )
    booking2 = Booking(
        user_id = 1,
        flight_id = 2,
        created_at = '2022-11-01'
    )
    booking3 = Booking(
        user_id = 2,
        flight_id = 3,
        created_at = '2022-12-01'
    )
    booking4 = Booking(
        user_id = 2,
        flight_id = 4,
        created_at = '2023-01-01'
    )

    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)
    db.session.commit()


def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()