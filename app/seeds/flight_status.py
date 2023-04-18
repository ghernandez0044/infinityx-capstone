from app.models import db, User, FlightStatus, environment, SCHEMA
from sqlalchemy.sql import text

def seed_flight_status():
    status1 = FlightStatus(
        status = 'On Time'
    )
    status2 = FlightStatus(
        status = 'Delayed'
    )
    status3 = FlightStatus(
        status = 'Cancelled'
    )

    db.session.add(status1)
    db.session.add(status2)
    db.session.add(status3)
    db.session.commit()

def undo_flight_status():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flight_status RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flight_status"))

    db.session.commit()