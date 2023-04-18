from flask.cli import AppGroup
from .users import seed_users, undo_users
from .planets import seed_planets, undo_planets
from .planet_comments import seed_planet_comments, undo_planet_comments
from .wallets import seed_wallets, undo_wallets
from .spaceports import seed_spaceports, undo_spaceports
from .spacecrafts import seed_spacecraft, undo_spacecrafts

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
        undo_spacecrafts()
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
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_spacecrafts()
    undo_spaceports()
    undo_wallets()
    undo_planet_comments()
    undo_planets()
    undo_users()
    # Add other undo functions here