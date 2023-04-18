from app.models import db, User, Planet, Wallet, Spaceport, Tier, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tiers():
    tier1 = Tier(
        name = 'Star Cadet',
        perks = 'As a Star Cadet, you are beginning your journey to infinity and beyond. Will recieve complimentary merchandise periodically as well as discounts (0 - 1,000 Stars)'
    )
    tier2 = Tier(
        name = 'Space Scout',
        perks = 'As a Space Scout, you have a journey or two under your space belt. Relax and enjoy complimentary bevarages in the lobby (1,001 - 10,000 Stars)'
    )
    tier3 = Tier(
        name = 'Ranger 1st Class',
        perks = 'As a Ranger 1st Class, you are rising through the space ranks and now hold a more senior position on the InfinityX hub. You will recieve complimentary meals in the lobby along with past tier benefits, free cancellations, and free rescheduling (10,001 - 100,000 Stars)'
    )
    tier4 = Tier(
        name = 'Planetary Pilot',
        perks = 'As a Planetary Pilot, you have been advancing through the space ranks for a while now and now hold a more senior position on the InfinityX hub. Along with past tier benefits, you will now enjoy access to a private lounge in the lobby while waiting for your flight (100,001 - 300,000 Stars)'
    )
    tier5 = Tier(
        name = 'Space Ace',
        perks = 'As a Space Ace, you are mastering the ways of the galaxy and are an avid cosmic fanatic. In addition to past tier benefits, you will now recieve monthly merchandise, discounted prices, extra stars, and monthly raffle entrances (300,001 - 600,000 Stars)'
    )
    tier6 = Tier(
        name = 'Cosmic Commando',
        perks = 'As a Cosmic Commando, you have made it this far by being a brave space adventurer. You have seen a lot and can find your way around the galaxy. In addition to previous tier benefits, you will recieve a special plaque to commemorate this achievement. You will also get to skip all lines. (600,001 - 999,998 Stars)'
    )
    tier7 = Tier(
        name = 'Galactic Hero',
        perks = 'As a Galactic Hero, that is what you are. A. Galactic. Hero. In addition to previous tier benefits, you now get a complimentary flight every year (+999,999 Stars)'
    )

    db.session.add(tier1)
    db.session.add(tier2)
    db.session.add(tier3)
    db.session.add(tier4)
    db.session.add(tier5)
    db.session.add(tier6)
    db.session.add(tier7)
    db.session.commit()


def undo_tiers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tiers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tiers"))

    db.session.commit() 