from app.models import db, User, Planet, Wallet, Spaceport, environment, SCHEMA
from sqlalchemy.sql import text

def seed_spaceports():
    spaceport1 = Spaceport(
        name = 'Vandenberg Space Force Base',
        description = 'Vandenberg Space Force Base, previously Vandenberg Air Force Base, is a United States Space Force Base in Santa Barbara County, California. Established in 1941, Vandenberg Space Force Base is a space launch base, launching spacecraft from the Western Range, and also performs missile testing.',
        city = 'Lompoc',
        state = 'California',
        lat = 34.75092,
        lng = -120.50796
    )
    spaceport2 = Spaceport(
        name = 'Los Angeles Space Force Base',
        description = "Los Angeles Air Force Base (LAAFB) is a United States Space Force Base located in El Segundo, California. Los Angeles Air Force Base houses and supports the headquarters of the United States Space Force's Space Systems Command (SSC), which was established on Aug. 13, 2021. The center manages research, development and acquisition of military space systems.",
        city = 'Los Angeles',
        state = 'California',
        lat = 33.91870,
        lng = -118.37682
    )
    spaceport3 = Spaceport(
        name = 'Patrick Space Force Base',
        description = "Patrick Space Force Base, is a United States Space Force installation located between Satellite Beach and Cocoa Beach, in Brevard County, Florida, United States.",
        city = 'Satellite Beach',
        state = 'Florida',
        lat = 28.23855,
        lng = -80.60820
    )
    spaceport4 = Spaceport(
        name = 'Buckley Space Force Base',
        description = "Buckley Space Force Base is a United States Space Force base in Aurora, Colorado named after United States Army Air Service First Lieutenant John Harold Buckley. The base is run by Space Base Delta 2, with major units including the U.S. Space Force's Space Delta 4 (flies the Defense Support Program and Space-Based Infrared System constellations from Buckley SFB and commands the Space Force's missile warning forces), the Colorado Air National Guard's 140th Wing (flies the F-16C Fighting Falcon), the Denver Naval Operations Support Center, and the National Reconnaissance Office's Aerospace Data Facility-Colorado.",
        city = 'Aurora',
        state = 'Colorado',
        lat = 39.70200,
        lng = -104.75690
    )
    spaceport5 = Spaceport(
        name = 'Peterson Space Force Base',
        description = "Peterson Space Force Base, previously Peterson Air Force Base, Peterson Field, and Army Air Base, Colorado Springs, is a U.S. Space Force Base that shares an airfield with the adjacent Colorado Springs Municipal Airport and is home to the North American Aerospace Defense Command (NORAD), the Space Force's 21st Space Wing, elements of the Space Force's Space Systems Command, and United States Northern Command (USNORTHCOM) headquarters.",
        city = 'Colorado Springs',
        state = 'Colorado',
        lat = 38.82485,
        lng = -104.70046
    )
    spaceport6 = Spaceport(
        name = 'Schriever Space Force Base',
        description = "Schriever Space Force Base, previously Schriever Air Force Base, Falcon Air Force Base, and Falcon Air Force Station, is a base of the United States Space Force located approximately 10 mi (16 km) east of Peterson Space Force Base near Colorado Springs in El Paso County, Colorado, United States.",
        city = 'Colorado Springs',
        state = 'Colorado',
        lat = 38.80822,
        lng = -104.52653
    )

    db.session.add(spaceport1)
    db.session.add(spaceport2)
    db.session.add(spaceport3)
    db.session.add(spaceport4)
    db.session.add(spaceport5)
    db.session.add(spaceport6)
    db.session.commit()


def undo_spaceports():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spaceports RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spaceports"))

    db.session.commit()