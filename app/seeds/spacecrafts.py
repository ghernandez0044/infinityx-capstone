from app.models import db, User, Planet, Wallet, Spaceport, Spacecraft, environment, SCHEMA
from sqlalchemy.sql import text

def seed_spacecraft():
    spacecraft1 = Spacecraft(
        model = 'Hawk 10',
        year = '2018',
        load_capacity_kg = 25_000,
        description = "Hawk 10 is a reusable, two-stage rocket designed and manufactured by InfinityX for the reliable and safe transport of people and payloads into Earth orbit and beyond. Hawk 10 is the world’s first orbital class reusable rocket. Reusability allows InfinityX to refly the most expensive parts of the rocket, which in turn drives down the cost of space access.",
        height_m = 70,
        diameter_m = 3.7,
        mass_kg = 549_054,
        capsule_volume_m = 9.3,
        trunk_volume_m = 37
    )
    spacecraft2 = Spacecraft(
        model = 'Hawk 10 Heavy',
        year = '2018',
        load_capacity_kg = 66_700,
        description = "Hawk Heavy is composed of three reusable Hawk 9 nine-engine cores whose 27 Merlin engines together generate more than 5 million pounds of thrust at liftoff, equal to approximately eighteen 747 aircraft. As one of the world’s most powerful operational rockets, Hawk Heavy can lift nearly 64 metric tons (141,000 lbs) to orbit.",
        height_m = 70,
        diameter_m = 3.7,
        mass_kg = 1_420_788,
        capsule_volume_m = 9.3,
        trunk_volume_m = 37
    )
    spacecraft3 = Spacecraft(
        model = 'Honey Badger',
        year = '2018',
        load_capacity_kg = 6_000,
        description = "The Honey Badger spacecraft is capable of carrying up to 7 passengers to and from Earth orbit, and beyond. It is the only spacecraft currently flying that is capable of returning significant amounts of cargo to Earth, and is the first private spacecraft to take humans to the space station.",
        height_m = 8.1,
        diameter_m = 4,
        mass_kg = 12_519,
        capsule_volume_m = 9.3,
        trunk_volume_m = 37
    )
    spacecraft4 = Spacecraft(
        model = 'Battleship',
        year = '2018',
        load_capacity_kg = 150_700,
        description = "InfinityX’s Battleship spacecraft and Super Heavy rocket – collectively referred to as Battleship – represent a fully reusable transportation system designed to carry both crew and cargo to Earth orbit, the Moon, Mars and beyond. Battleship is the world’s most powerful launch vehicle ever developed, capable of carrying up to 150 metric tonnes fully reusable and 250 metric tonnes expendable.",
        height_m = 120,
        diameter_m = 9,
        mass_kg = 50_000,
        capsule_volume_m = 19.3,
        trunk_volume_m = 99
    )

    db.session.add(spacecraft1)
    db.session.add(spacecraft2)
    db.session.add(spacecraft3)
    db.session.add(spacecraft4)
    db.session.commit()


def undo_spacecraft():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spacecrafts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spacecrafts"))

    db.session.commit()