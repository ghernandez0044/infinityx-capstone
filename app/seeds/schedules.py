from app.models import db, Schedule, environment, SCHEMA
from sqlalchemy.sql import text

def seed_schedules():
    schedule1 = Schedule(
        launch_spaceport_id = 1,
        landing_spaceport_id = 2,
        departure_time = '2023-04-26T08:30:00',
        arrival_time = '2023-05-05T08:30:00'
    )
    schedule2 = Schedule(
        launch_spaceport_id = 2,
        landing_spaceport_id = 3,
        departure_time = '2023-05-07T08:30:00',
        arrival_time = '2023-05-16T08:30:00'
    )
    schedule3 = Schedule(
        launch_spaceport_id = 3,
        landing_spaceport_id = 4,
        departure_time = '2023-05-17T08:30:00',
        arrival_time = '2023-05-30T08:30:00'
    )
    schedule4 = Schedule(
        launch_spaceport_id = 4,
        landing_spaceport_id = 1,
        departure_time = '2023-06-01T08:30:00',
        arrival_time = '2023-06-16T08:30:00'
    )
    schedule5 = Schedule(
        launch_spaceport_id = 3,
        landing_spaceport_id = 2,
        departure_time = '2023-06-17T08:30:00',
        arrival_time = '2023-06-30T08:30:00'
    )
    schedule6 = Schedule(
        launch_spaceport_id = 2,
        landing_spaceport_id = 3,
        departure_time = '2023-07-01T08:30:00',
        arrival_time = '2023-07-16T08:30:00'
    )
 

    db.session.add(schedule1)
    db.session.add(schedule2)
    db.session.add(schedule3)
    db.session.add(schedule4)
    db.session.add(schedule5)
    db.session.add(schedule6)
    db.session.commit()


def undo_schedules():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.schedules RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM schedules"))

    db.session.commit()
