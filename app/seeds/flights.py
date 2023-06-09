from app.models import db, Flight, environment, SCHEMA
from sqlalchemy.sql import text

def seed_flights():
    flight1 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 2,
        spacecraft_id = 1,
        departure_time = '2024-01-01T08:00',
        arrival_time = '2024-01-15T08:00',
        orbit = 'Mercury',
        created_at = '2021-01-01'
    )
    flight2 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 3,
        spacecraft_id = 1,
        departure_time = '2024-02-01T08:00',
        arrival_time = '2024-02-15T08:00',
        orbit = 'Venus',
        created_at = '2021-02-01'
    )
    flight3 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 4,
        spacecraft_id = 1,
        departure_time = '2024-03-01T08:00',
        arrival_time = '2024-03-15T08:00',
        orbit = 'Earth',
        created_at = '2021-03-01'
    )
    flight4 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 5,
        spacecraft_id = 1,
        departure_time = '2024-04-01T08:00',
        arrival_time = '2024-04-15T08:00',
        orbit = 'Mars',
        created_at = '2021-04-01'
    )
    flight5 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 6,
        spacecraft_id = 1,
        departure_time = '2024-05-01T08:00',
        arrival_time = '2024-05-15T08:00',
        orbit = 'Jupiter',
        created_at = '2022-01-01'
    )
    flight6 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 3,
        spacecraft_id = 1,
        departure_time = '2024-06-01T08:00',
        arrival_time = '2024-06-15T08:00',
        orbit = 'Saturn',
        created_at = '2022-03-01'
    )
    flight7 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 5,
        spacecraft_id = 1,
        departure_time = '2024-07-01T08:00',
        arrival_time = '2024-07-15T08:00',
        orbit = 'Uranus',
        created_at = '2022-03-01'
    )
    flight8 = Flight(
        launch_spaceport_id = 1,
        landing_spaceport_id = 6,
        spacecraft_id = 1,
        departure_time = '2024-08-01T08:00',
        arrival_time = '2024-08-15T08:00',
        orbit = 'Neptune',
        created_at = '2022-03-01'
    )
    flight9 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 1,
        spacecraft_id = 2,
        departure_time = '2024-01-01T08:00',
        arrival_time = '2024-01-15T08:00',
        orbit = 'Neptune',
        created_at = '2021-01-01'
    )
    flight10 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 3,
        spacecraft_id = 2,
        departure_time = '2024-02-01T08:00',
        arrival_time = '2024-02-15T08:00',
        orbit = 'Uranus',
        created_at = '2021-02-01'
    )
    flight11 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 4,
        spacecraft_id = 2,
        departure_time = '2024-03-01T08:00',
        arrival_time = '2024-03-15T08:00',
        orbit = 'Saturn',
        created_at = '2021-03-01'
    )
    flight12 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 5,
        spacecraft_id = 2,
        departure_time = '2024-04-01T08:00',
        arrival_time = '2024-04-15T08:00',
        orbit = 'Jupiter',
        created_at = '2021-04-01'
    )
    flight13 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 6,
        spacecraft_id = 2,
        departure_time = '2024-05-01T08:00',
        arrival_time = '2024-05-15T08:00',
        orbit = 'Mars',
        created_at = '2022-01-01'
    )
    flight14 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 3,
        spacecraft_id = 2,
        departure_time = '2024-06-01T08:00',
        arrival_time = '2024-06-15T08:00',
        orbit = 'Earth',
        created_at = '2022-03-01'
    )
    flight15 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 5,
        spacecraft_id = 2,
        departure_time = '2024-07-01T08:00',
        arrival_time = '2024-07-15T08:00',
        orbit = 'Venus',
        created_at = '2022-03-01'
    )
    flight16 = Flight(
        launch_spaceport_id = 2,
        landing_spaceport_id = 6,
        spacecraft_id = 2,
        departure_time = '2024-08-01T08:00',
        arrival_time = '2024-08-15T08:00',
        orbit = 'Mercury',
        created_at = '2022-03-01'
    )
    flight17 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 1,
        spacecraft_id = 3,
        departure_time = '2025-01-01T08:00',
        arrival_time = '2025-01-15T08:00',
        orbit = 'Mercury',
        created_at = '2022-01-01'
    )
    flight18 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 2,
        spacecraft_id = 3,
        departure_time = '2025-02-01T08:00',
        arrival_time = '2025-02-15T08:00',
        orbit = 'Venus',
        created_at = '2022-02-01'
    )
    flight19 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 4,
        spacecraft_id = 2,
        departure_time = '2025-03-01T08:00',
        arrival_time = '2025-03-15T08:00',
        orbit = 'Earth',
        created_at = '2022-03-01'
    )
    flight20 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 5,
        spacecraft_id = 3,
        departure_time = '2025-04-01T08:00',
        arrival_time = '2025-04-15T08:00',
        orbit = 'Mars',
        created_at = '2022-04-01'
    )
    flight21 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 6,
        spacecraft_id = 3,
        departure_time = '2025-05-01T08:00',
        arrival_time = '2025-05-15T08:00',
        orbit = 'Jupiter',
        created_at = '2023-01-01'
    )
    flight22 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 2,
        spacecraft_id = 3,
        departure_time = '2025-06-01T08:00',
        arrival_time = '2025-06-15T08:00',
        orbit = 'Saturn',
        created_at = '2023-03-01'
    )
    flight23 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 5,
        spacecraft_id = 3,
        departure_time = '2025-07-01T08:00',
        arrival_time = '2025-07-15T08:00',
        orbit = 'Uranus',
        created_at = '2023-03-01'
    )
    flight24 = Flight(
        launch_spaceport_id = 3,
        landing_spaceport_id = 6,
        spacecraft_id = 3,
        departure_time = '2025-08-01T08:00',
        arrival_time = '2025-08-15T08:00',
        orbit = 'Neptune',
        created_at = '2023-03-01'
    )
    flight25 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 1,
        spacecraft_id = 4,
        departure_time = '2026-01-01T08:00',
        arrival_time = '2026-01-15T08:00',
        orbit = 'Neptune',
        created_at = '2023-01-01'
    )
    flight26 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 2,
        spacecraft_id = 4,
        departure_time = '2026-02-01T08:00',
        arrival_time = '2026-02-15T08:00',
        orbit = 'Uranus',
        created_at = '2023-02-01'
    )
    flight27 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 3,
        spacecraft_id = 4,
        departure_time = '2026-03-01T08:00',
        arrival_time = '2026-03-15T08:00',
        orbit = 'Saturn',
        created_at = '2023-03-01'
    )
    flight28 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 5,
        spacecraft_id = 4,
        departure_time = '2026-04-01T08:00',
        arrival_time = '2026-04-15T08:00',
        orbit = 'Jupiter',
        created_at = '2023-04-01'
    )
    flight29 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 6,
        spacecraft_id = 4,
        departure_time = '2026-05-01T08:00',
        arrival_time = '2026-05-15T08:00',
        orbit = 'Mars',
        created_at = '2024-01-01'
    )
    flight30 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 2,
        spacecraft_id = 4,
        departure_time = '2026-06-01T08:00',
        arrival_time = '2026-06-15T08:00',
        orbit = 'Earth',
        created_at = '2024-03-01'
    )
    flight31 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 5,
        spacecraft_id = 4,
        departure_time = '2026-07-01T08:00',
        arrival_time = '2026-07-15T08:00',
        orbit = 'Venus',
        created_at = '2024-03-01'
    )
    flight32 = Flight(
        launch_spaceport_id = 4,
        landing_spaceport_id = 6,
        spacecraft_id = 4,
        departure_time = '2026-08-01T08:00',
        arrival_time = '2026-08-15T08:00',
        orbit = 'Mercury',
        created_at = '2024-03-01'
    )

    db.session.add(flight1)
    db.session.add(flight2)
    db.session.add(flight3)
    db.session.add(flight4)
    db.session.add(flight5)
    db.session.add(flight6)
    db.session.add(flight7)
    db.session.add(flight8)
    db.session.add(flight9)
    db.session.add(flight10)
    db.session.add(flight11)
    db.session.add(flight12)
    db.session.add(flight13)
    db.session.add(flight14)
    db.session.add(flight15)
    db.session.add(flight16)
    db.session.add(flight17)
    db.session.add(flight18)
    db.session.add(flight19)
    db.session.add(flight20)
    db.session.add(flight21)
    db.session.add(flight22)
    db.session.add(flight23)
    db.session.add(flight24)
    db.session.add(flight25)
    db.session.add(flight26)
    db.session.add(flight27)
    db.session.add(flight28)
    db.session.add(flight29)
    db.session.add(flight30)
    db.session.add(flight31)
    db.session.add(flight32)
    db.session.commit()


def undo_flights():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flights RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flights"))

    db.session.commit()