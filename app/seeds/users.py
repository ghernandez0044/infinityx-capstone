from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demouser',
        email='demouser@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Demo',
        last_name='User',
        phone='8316667788',
        passport='Earthling',
        profile_pic='https://as1.ftcdn.net/v2/jpg/03/81/66/86/1000_F_381668640_Gv9wytd4ZlIgZWzVGfzSyfaNR7XJiL9p.jpg',
        created_at="2018-01-01")
    admin = User(
        username='adminuser',
        email='adminuser@aa.io',
        password='password',
        planet_id=3,
        admin=True,
        first_name='Admin',
        last_name='User',
        phone='4087779988',
        passport='Earthling',
        profile_pic='https://as2.ftcdn.net/v2/jpg/02/98/24/71/1000_F_298247136_ZkgmmlgakaRV2DwJuzrsBARK3sDMSccr.jpg',
        created_at="2017-01-01")
    elon = User(
        username='elon_musk',
        email='elonmusk@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Elon',
        last_name='Musk',
        phone='4086367588',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg',
        created_at="2018-02-01")
    bernard = User(
        username='bernard_arnault',
        email='bernardarnault@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Bernanrd',
        last_name='Arnault',
        phone='4085767388',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/d/de/Bernard_Arnault_%283%29_-_2017_%28cropped%29.jpg',
        created_at="2018-03-15")
    jeff = User(
        username='jeff_bezos',
        email='jeffbezos@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Jeff',
        last_name='Bezos',
        phone='4084397088',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/8076/8362040192_e0ea688efb_b.jpg',
        created_at="2018-04-28")
    bill = User(
        username='bill_gates',
        email='billgates@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Bill',
        last_name='Gates',
        phone='4087096534',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/8076/8362040192_e0ea688efb_b.jpg',
        created_at="2019-03-14")
    larry = User(
        username='larry_page',
        email='llarrypage@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Larry',
        last_name='Page',
        phone='4085397780',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/3651/5790205085_a49af0fc66_b.jpg',
        created_at="2019-04-30")
    warren = User(
        username='warren_buffet',
        email='warrenbuffet@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Warren',
        last_name='Buffet',
        phone='4084068579',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/4215/35649960832_e76a799b6c_b.jpg',
        created_at="2020-01-01")
    sergey = User(
        username='sergey_brin',
        email='sergeybrin@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Sergey',
        last_name='Brin',
        phone='4085391252',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/2422/3570577093_e91027ae63.jpg',
        created_at="2021-03-24")
    steve = User(
        username='steve_ballmer',
        email='steveballmer@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Steve',
        last_name='Ballmer',
        phone='4084596688',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/5084/5245935215_95d86a5b77_b.jpg',
        created_at="2021-04-27")
    serena = User(
        username='serena_williams',
        email='serenawilliams@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Serena',
        last_name='Williams',
        phone='4082346588',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/7402/8868500843_ae4348d629_b.jpg',
        created_at="2021-04-29")
    catherine = User(
        username='catherine_wales',
        email='catherinewales@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Catherine',
        last_name='Wales',
        phone='4084097181',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/5/51/Coat_of_arms_of_Catherine%2C_Princess_of_Wales.svg',
        created_at="2021-05-17")
    alexandria = User(
        username='alexandria_cortez',
        email='alexandriacortez@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Alexandria',
        last_name='Cortez',
        phone='4085594388',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/7919/46438133315_57f4781f4d_b.jpg',
        created_at="2021-06-23")
    miley = User(
        username='miley_cyrus',
        email='mileycyrus@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Miley',
        last_name='Cyrus',
        phone='4087894356',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/1232/4724939047_0f87353eba_b.jpg',
        created_at="2021-07-11")
    nicki = User(
        username='nicki_minaj',
        email='nickiminaj@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Nicki',
        last_name='Minaj',
        phone='4087894942',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/f/f6/Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4473_%287448973854%29.jpg',
        created_at="2021-09-14")
    cristiano = User(
        username='cristiano_ronaldo',
        email='cristianoronaldo@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Cristiano',
        last_name='Ronaldo',
        phone='4087995699',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/3/3f/Cristiano_Ronaldo_Madrid.jpg',
        created_at="2021-11-27")
    lionel = User(
        username='lionel_messi',
        email='lionelmessi@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Lionel',
        last_name='Messi',
        phone='4085391369',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        created_at="2022-01-17")
    kylie = User(
        username='kylie_jenner',
        email='kyliejenner@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Kylie',
        last_name='Jenner',
        phone='4085194569',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/351/31835100192_c83d6b4182.jpg',
        created_at="2022-02-16")
    selena = User(
        username='selena_gomez',
        email='selenagomez@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Selena',
        last_name='Gomez',
        phone='4088096977',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/2681/4196102979_b8f427099e.jpg',
        created_at="2022-04-20")
    seth = User(
        username='seth_rogan',
        email='sethrogan@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Seth',
        last_name='Rogan',
        phone='4086666977',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/8102/8610585355_8f5538d8b3_b.jpg',
        created_at="2022-04-20")
    james = User(
        username='james_franco',
        email='jamesfranco@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='James',
        last_name='Franco',
        phone='4087776977',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/2883/9689707051_bcd033e57a_b.jpg',
        created_at="2022-04-20")
    dwayne = User(
        username='dwayne_johnson',
        email='dwaynejohnson@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Dwayne',
        last_name='Johnson',
        phone='4088886977',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/3372/3630750300_f1cd14cdc3_b.jpg',
        created_at="2022-05-01")
    kevin = User(
        username='kevin_hart',
        email='kevinhart@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Kevin',
        last_name='Hart',
        phone='4087896977',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/5/5e/Kevin-Hart_Chicago_2012-04-11_photoby_Adam-Bielawski_2.jpg',
        created_at="2022-05-01")
    ariana = User(
        username='ariana_grande',
        email='arianagrande@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Ariana',
        last_name='Grande',
        phone='4087896989',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/3820/33269921925_405a790081_b.jpg',
        created_at="2022-06-25")
    kim = User(
        username='kim_kardashian',
        email='kimkardashian@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Kim',
        last_name='Kardashian',
        phone='4086666989',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/8308/8002636280_9340468dda_b.jpg',
        created_at="2022-08-01")
    kanye = User(
        username='kanye_west',
        email='kanyewest@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Kanye',
        last_name='West',
        phone='4084056688',
        passport='Earthling',
        profile_pic='https://upload.wikimedia.org/wikipedia/commons/0/05/Kanye_West_2007.jpg',
        created_at="2022-08-01")
    justin = User(
        username='justin_bieber',
        email='justinbieber@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Justin',
        last_name='Bieber',
        phone='4084054783',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/1318/4592640616_e42121eb63_b.jpg',
        created_at="2022-09-08")
    taylor = User(
        username='taylor_swift',
        email='taylorswift@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Taylor',
        last_name='Swift',
        phone='4086664783',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/7067/6820799756_8c3ef01322_b.jpg',
        created_at="2022-10-18")
    jennifer = User(
        username='jennifer_lopez',
        email='jenniferlopez@aa.io',
        password='password',
        planet_id=3,
        admin=False,
        first_name='Jennifer',
        last_name='Lopez',
        phone='4086664783',
        passport='Earthling',
        profile_pic='https://live.staticflickr.com/5574/14177118417_810f0d9b9b_b.jpg',
        created_at="2022-10-18")
    

    db.session.add(demo)
    db.session.add(admin)
    db.session.add(elon)
    db.session.add(bernard)
    db.session.add(jeff)
    db.session.add(bill)
    db.session.add(larry)
    db.session.add(warren)
    db.session.add(sergey)
    db.session.add(steve)
    db.session.add(serena)
    db.session.add(catherine)
    db.session.add(alexandria)
    db.session.add(miley)
    db.session.add(nicki)
    db.session.add(cristiano)
    db.session.add(lionel)
    db.session.add(kylie)
    db.session.add(selena)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.add(elon)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()