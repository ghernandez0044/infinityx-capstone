from app.models import db, Flight, environment, SCHEMA
from sqlalchemy.sql import text

def seed_flights():
    flight1 = Flight(
        user_id = 1,
        spaceport_id = 1,
        spacecraft_id = 1,
        spacecraft_seat_id = 3,
        schedule_id = 1,
        flight_status_id = 1,
        created_at = '2021-01-01'
    )
    flight2 = Flight(
        user_id = 1,
        spaceport_id = 2,
        spacecraft_id = 1,
        spacecraft_seat_id = 5,
        schedule_id = 2,
        flight_status_id = 2,
        created_at = '2021-02-01'
    )
    flight3 = Flight(
        user_id = 1,
        spaceport_id = 3,
        spacecraft_id = 3,
        spacecraft_seat_id = 24,
        schedule_id = 3,
        flight_status_id = 3,
        created_at = '2021-03-01'
    )
    flight4 = Flight(
        user_id = 2,
        spaceport_id = 4,
        spacecraft_id = 2,
        spacecraft_seat_id = 12,
        schedule_id = 4,
        flight_status_id = 1,
        created_at = '2021-04-01'
    )
    flight5 = Flight(
        user_id = 2,
        spaceport_id = 3,
        spacecraft_id = 3,
        spacecraft_seat_id = 16,
        schedule_id = 5,
        flight_status_id = 1,
        created_at = '2022-01-01'
    )
    flight6 = Flight(
        user_id = 2,
        spaceport_id = 3,
        spacecraft_id = 4,
        spacecraft_seat_id = 20,
        schedule_id = 6,
        flight_status_id = 1,
        created_at = '2022-03-01'
    )

    db.session.add(flight1)
    db.session.add(flight2)
    db.session.add(flight3)
    db.session.add(flight4)
    db.session.add(flight5)
    db.session.add(flight6)
    db.session.commit()


def undo_flights():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flights RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flights"))

    db.session.commit()