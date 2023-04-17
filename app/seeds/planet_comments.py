from app.models import db, User, Planet, PlanetComment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_planet_comments():
    comment1 = PlanetComment(
        user_id = 1,
        planet_id = 1,
        content = 'What a great sight! Definately would recommend visiting!'
    )
    comment2 = PlanetComment(
        user_id = 1,
        planet_id = 2,
        content = 'What a relaxing flight! Definately would do this again!'
    )
    comment3 = PlanetComment(
        user_id = 1,
        planet_id = 3,
        content = 'What can I say, nothing beats home!'
    )
    comment4 = PlanetComment(
        user_id = 2,
        planet_id = 1,
        content = 'Love the color of this planet!'
    )
    comment5 = PlanetComment(
        user_id = 2,
        planet_id = 2,
        content = 'I got the chills just looking at it'
    )
    comment6 = PlanetComment(
        user_id = 2,
        planet_id = 3,
        content = 'What a beatiful planet!'
    )
    comment7 = PlanetComment(
        user_id = 2,
        planet_id = 4,
        content = 'What a giant sight! Definately would recommend visiting!'
    )
    comment8 = PlanetComment(
        user_id = 2,
        planet_id = 5,
        content = 'I cannot wait to return!'
    )
    comment9 = PlanetComment(
        user_id = 2,
        planet_id = 6,
        content = 'I never thought I would see this up close'
    )
    comment10 = PlanetComment(
        user_id = 2,
        planet_id = 7,
        content = 'I have been here and let me tell you, you need to be there!'
    )
    comment11 = PlanetComment(
        user_id = 2,
        planet_id = 8,
        content = 'To the depths of our galaxy, a sight to behold!'
    )
    comment12 = PlanetComment(
        user_id = 3,
        planet_id = 1,
        content = 'Such a pretty planet, it has been amazing to see'
    )
    comment13 = PlanetComment(
        user_id = 3,
        planet_id = 2,
        content = 'I feel like I really need to come back and see this again'
    )
    comment14 = PlanetComment(
        user_id = 3,
        planet_id = 3,
        content = 'My home! All of it.'
    )
    comment15 = PlanetComment(
        user_id = 3,
        planet_id = 4,
        content = 'I have some really exciting ideas for some new living headquarters here'
    )
    comment16 = PlanetComment(
        user_id = 4,
        planet_id = 5,
        content = 'I would have never thought of how long the ride here would be!'
    )
    comment17 = PlanetComment(
        user_id = 5,
        planet_id = 6,
        content = 'Such a pretty color!'
    )
    comment18 = PlanetComment(
        user_id = 6,
        planet_id = 7,
        content = 'I am in love with the place, you can really see the detail!'
    )
    comment19 = PlanetComment(
        user_id = 7,
        planet_id = 8,
        content = 'I do not think I will be making this trip again, it was too long for me'
    )
    comment20 = PlanetComment(
        user_id = 8,
        planet_id = 1,
        content = 'I liked the trip, I liked the food, and I liked the planet'
    )
    comment21 = PlanetComment(
        user_id = 9,
        planet_id = 2,
        content = 'I am really pleased with how this trip turned out, I would recommend!'
    )
    comment22 = PlanetComment(
        user_id = 10,
        planet_id = 3,
        content = 'Cannot complain'
    )
    comment23 = PlanetComment(
        user_id = 11,
        planet_id = 4,
        content = 'Perfect weather and lovely sunsets! I will be coming back for sure!'
    )
    comment24 = PlanetComment(
        user_id = 12,
        planet_id = 5,
        content = 'A little too chilly for my liking'
    )
    comment25 = PlanetComment(
        user_id = 13,
        planet_id = 6,
        content = 'I wonder if this planet is in need of some democracy'
    )
    comment26 = PlanetComment(
        user_id = 14,
        planet_id = 7,
        content = 'Lucky number 7!'
    )
    comment27 = PlanetComment(
        user_id = 15,
        planet_id = 8,
        content = 'Seven Ate Nine'
    )
    comment28 = PlanetComment(
        user_id = 16,
        planet_id = 1,
        content = 'I would buy'
    )
    comment29 = PlanetComment(
        user_id = 17,
        planet_id = 2,
        content = 'I would buy too'
    )
    comment30 = PlanetComment(
        user_id = 18,
        planet_id = 3,
        content = 'I feel like earth would look better in pink, no really'
    )
    comment31 = PlanetComment(
        user_id = 19,
        planet_id = 4,
        content = 'Oh my god! Such a pretty place, so in love!'
    )
    comment32 = PlanetComment(
        user_id = 20,
        planet_id = 5,
        content = 'No plants or vegetation here, not interested'
    )
    comment33 = PlanetComment(
        user_id = 21,
        planet_id = 5,
        content = 'Same thing Seth said right there, yessirr'
    )
    comment34 = PlanetComment(
        user_id = 22,
        planet_id = 6,
        content = 'I can totally film my next movie here'
    )
    comment35 = PlanetComment(
        user_id = 23,
        planet_id = 6,
        content = 'I am only here to tell everyone that Dwayne is not an actual rock, do not believe everything you hear'
    )
    comment36 = PlanetComment(
        user_id = 24,
        planet_id = 7,
        content = 'Yaaaaaaay'
    )
    comment37 = PlanetComment(
        user_id = 25,
        planet_id = 8,
        content = 'I totally had to come check this out!'
    )
    comment38 = PlanetComment(
        user_id = 26,
        planet_id = 8,
        content = 'I will run for president here'
    )
    comment37 = PlanetComment(
        user_id = 27,
        planet_id = 1,
        content = 'Is it too late now to say sorry?'
    )
    comment38 = PlanetComment(
        user_id = 28,
        planet_id = 2,
        content = 'Kanye is not here, right?'
    )
    comment39 = PlanetComment(
        user_id = 29,
        planet_id = 3,
        content = 'home sweet home'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)
    db.session.add(comment28)
    db.session.add(comment29)
    db.session.add(comment30)
    db.session.add(comment31)
    db.session.add(comment32)
    db.session.add(comment33)
    db.session.add(comment34)
    db.session.add(comment35)
    db.session.add(comment36)
    db.session.add(comment37)
    db.session.add(comment38)
    db.session.add(comment39)
    db.session.commit()
    


def undo_planet_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.planet_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM planet_comments"))
        
    db.session.commit()