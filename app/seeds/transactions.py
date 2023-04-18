from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transactions():
    transaction1 = Transaction(
        user_id = 1,
        seat_id = 3,
        quantity = 1,
        unit_price = 7_250,
        user_kg = 60,
        tax_percentage = 7.25,
        tax_total = 32_625,
        total = 467_625,
        created_at = '2021-01-01'
        )

    transaction2 = Transaction(
        user_id = 1,
        seat_id = 5,
        quantity = 1,
        unit_price = 9_250,
        user_kg = 62,
        tax_percentage = 7.25,
        tax_total = 43_012.50,
        total = 616_512.50,
        created_at = '2021-02-01'
    )
    transaction3 = Transaction(
        user_id = 1,
        seat_id = 24,
        quantity = 1,
        unit_price = 9_250,
        user_kg = 62,
        tax_percentage = 7.25,
        tax_total = 43_012.50,
        total = 616_512.50,
        created_at = '2021-03-01'
    )
    transaction4 = Transaction(
        user_id = 2,
        seat_id = 12,
        quantity = 1,
        unit_price = 9_250,
        user_kg = 64,
        tax_percentage = 7.25,
        tax_total = 44_400,
        total = 636_400,
        created_at = '2021-04-01'
    )
    transaction5 = Transaction(
        user_id = 2,
        seat_id = 16,
        quantity = 1,
        unit_price = 7_250,
        user_kg = 64,
        tax_percentage = 7.25,
        tax_total = 34_800,
        total = 498_800,
        created_at = '2022-01-01'
    )
    transaction6 = Transaction(
        user_id = 3,
        seat_id = 20,
        quantity = 1,
        unit_price = 6_250,
        user_kg = 58,
        tax_percentage = 7.25,
        tax_total = 27_187.50,
        total = 389_687.50,
        created_at = '2022-03-01'
        )

    db.session.add(transaction1)
    db.session.add(transaction1)
    db.session.add(transaction1)
    db.session.add(transaction1)
    db.session.add(transaction1)
    db.session.add(transaction1)
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
