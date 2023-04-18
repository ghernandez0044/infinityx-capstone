from flask.cli import AppGroup
from .users import seed_users, undo_users
from .planets import seed_planets, undo_planets
from .planet_comments import seed_planet_comments, undo_planet_comments
from .wallets import seed_wallets, undo_wallets
from .spaceports import seed_spaceports, undo_spaceports
from .spacecrafts import seed_spacecraft, undo_spacecraft
from .tiers import seed_tiers, undo_tiers
from .frequent_flyers import seed_frequent_flyers, undo_frequent_flyers
from .travel_classes import seed_travel_class, undo_travel_class
from .spacecraft_seats import seed_spacecraft_seats, undo_spacecraft_seats
from .transactions import seed_transactions, undo_transactions
from .flight_status import seed_flight_status, undo_flight_status
from .schedules import seed_schedules, undo_schedules
 
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_schedules()
        undo_flight_status()
        undo_transactions()
        undo_spacecraft_seats()
        undo_travel_class()
        undo_frequent_flyers()
        undo_tiers()
        undo_spacecraft()
        undo_spaceports()
        undo_wallets()
        undo_planet_comments()
        undo_planets()
        undo_users()
    seed_users()
    seed_planets()
    seed_planet_comments()
    seed_wallets()
    seed_spaceports()
    seed_spacecraft()
    seed_tiers()
    seed_frequent_flyers()
    seed_travel_class()
    seed_spacecraft_seats()
    seed_transactions()
    seed_flight_status()
    seed_schedules()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_schedules()
    undo_flight_status()
    undo_transactions()
    undo_spacecraft_seats()
    undo_travel_class()
    undo_frequent_flyers()
    undo_tiers()
    undo_spacecraft()
    undo_spaceports()
    undo_wallets()
    undo_planet_comments()
    undo_planets()
    undo_users()
    # Add other undo functions here