from app.models import db, User, Planet, Wallet, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wallets():
    wallet1 = Wallet(
        user_id = 1,
        address = '032734021472E8BD840DD9EC57AF15CE',
        funds = 1_000_000
    )
    wallet2 = Wallet(
        user_id = 2,
        address = '5E7A59686511CF577121AFDFC68D007F',
        funds = 10_000_000
    )
    wallet3 = Wallet(
        user_id = 3,
        address = 'DC44BDC0D016ABF7F1CD5F16A23B0591',
        funds = 0
    )
    wallet4 = Wallet(
        user_id = 4,
        address = '15FFAC5169B04BEE3B3C627CED11EF47',
        funds = 0
    )
    wallet5 = Wallet(
        user_id = 5,
        address = '76B63E455908748480AEAF9F0292011D',
        funds = 0
    )
    wallet6 = Wallet(
        user_id = 6,
        address = '4CB23A4E6679316CF079E68C365C3D08',
        funds = 0
    )
    wallet7 = Wallet(
        user_id = 7,
        address = 'EA38C8F696794F0FF2433CCE4E2F253D',
        funds = 0
    )
    wallet8 = Wallet(
        user_id = 8,
        address = 'B9FCCC840EF7F346697AAC222655F286',
        funds = 0
    )
    wallet9 = Wallet(
        user_id = 9,
        address = 'A096F0667AE3D157B47B88684C056672',
        funds = 0
    )
    wallet10 = Wallet(
        user_id = 10,
        address = 'CE64ABC44BB90420EE338E327D890B92',
        funds = 0
    )
    wallet11 = Wallet(
        user_id = 11,
        address = '76EB44F27352A4C535293D9F3AA12CAD',
        funds = 0
    )
    wallet12 = Wallet(
        user_id = 12,
        address = '95FF4E53151B35F238038EE12B538E47',
        funds = 0
    )
    wallet13 = Wallet(
        user_id = 13,
        address = '5E566D341909F33DEA1CC57626BF9863',
        funds = 0
    )
    wallet14 = Wallet(
        user_id = 14,
        address = '8EBA8D4F32C16A2B43A86EA3D7145C11',
        funds = 0
    )
    wallet15 = Wallet(
        user_id = 15,
        address = '7ABCD7C2B0F753B09280178C61D861A9',
        funds = 0
    )
    wallet16 = Wallet(
        user_id = 16,
        address = '3EDAB440A9C46025705BAB54C3DD452F',
        funds = 0
    )
    wallet17 = Wallet(
        user_id = 17,
        address = 'DBB77BD9A4EFB19A60A35E9439CEBB4D',
        funds = 0
    )
    wallet18 = Wallet(
        user_id = 18,
        address = '90FE3FAA9001C1EC6EC510C082FBDA3D',
        funds = 0
    )
    wallet19 = Wallet(
        user_id = 19,
        address = '2ADC5743656768A3C0330C86D4239563',
        funds = 0
    )
    wallet20 = Wallet(
        user_id = 20,
        address = '07BA914B6DA077E40EB2B548D3E18D35',
        funds = 0
    )
    wallet21 = Wallet(
        user_id = 21,
        address = '81E07E8AAC667F919AF1EA364DD2564C',
        funds = 0
    )
    wallet22 = Wallet(
        user_id = 22,
        address = '6D1923623353F78D4A591DCEE85343D9',
        funds = 0
    )
    wallet23 = Wallet(
        user_id = 23,
        address = 'D65C5A6E254714A4658B2FDC1D900E4A',
        funds = 0
    )
    wallet24 = Wallet(
        user_id = 24,
        address = '5AEB74B86B428D3806F30F8BCD439631',
        funds = 0
    )
    wallet25 = Wallet(
        user_id = 25,
        address = '7C73C2A3B3D860662460511E970FBD2A',
        funds = 0
    )
    wallet26 = Wallet(
        user_id = 26,
        address = '67EF1D223B0151CF17D18734400429DF',
        funds = 0
    )
    wallet27 = Wallet(
        user_id = 27,
        address = '571310FDB1B1BF5974962842BDFF6295',
        funds = 0
    )
    wallet28 = Wallet(
        user_id = 28,
        address = '357649A6A6E998A99A0512BB9AD864F8',
        funds = 0
    )
    wallet29 = Wallet(
        user_id = 29,
        address = 'D5DE0176E765EE3FCC8036BDD5E70512',
        funds = 0
    )

    db.session.add(wallet1)
    db.session.add(wallet2)
    db.session.add(wallet3)
    db.session.add(wallet4)
    db.session.add(wallet5)
    db.session.add(wallet6)
    db.session.add(wallet7)
    db.session.add(wallet8)
    db.session.add(wallet9)
    db.session.add(wallet10)
    db.session.add(wallet11)
    db.session.add(wallet12)
    db.session.add(wallet13)
    db.session.add(wallet14)
    db.session.add(wallet15)
    db.session.add(wallet16)
    db.session.add(wallet17)
    db.session.add(wallet18)
    db.session.add(wallet19)
    db.session.add(wallet20)
    db.session.add(wallet21)
    db.session.add(wallet22)
    db.session.add(wallet23)
    db.session.add(wallet24)
    db.session.add(wallet25)
    db.session.add(wallet26)
    db.session.add(wallet27)
    db.session.add(wallet28)
    db.session.add(wallet29)
    db.session.commit()


def undo_wallets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wallets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wallets"))