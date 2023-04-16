from app.models import db, User, Planet, environment, SCHEMA
from sqlalchemy.sql import text

def seed_planets():
    mercury = Planet(
      name = 'Mercury',
      description = 'Welcome to Mercury! Mercury is the first planet from our Sun and is the smallest terrestrial planet of our Solar System. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes.',
      distance_from_earth_km = 77_000_000,
      mass_measured_in_earths = 0.055,
      volume_measured_in_earths = 0.056,
      mean_density_in_g_cm_cubed = 5.427,
      surface_gravity_in_m_squared = 3.7,
      escape_velocity_in_km_per_sec = 4.25,
      synodic_rotation_period_in_days = 176,
      temperature_in_k = 437
    )
    venus = Planet(
      name = 'Venus',
      description = "Welcome to Venus! Venus is the second planet from our Sun and is the only terrestrial object in our Solar System other than Earth that has a substantial atmosphere and is almost as massive and large as Earth. Venus appears in Earth's sky also as the brightest natural object, aside from the Sun and Moon, due to its proximity to Earth and the Sun, its large size and high albedo.",
      distance_from_earth_km = 38_000_000,
      mass_measured_in_earths = 0.815,
      volume_measured_in_earths = 0.857,
      mean_density_in_g_cm_cubed = 5.243,
      surface_gravity_in_m_squared = 8.87,
      escape_velocity_in_km_per_sec = 10.36,
      synodic_rotation_period_in_days = 117,
      temperature_in_k = 232
    )
    earth = Planet(
      name = 'Earth',
      description = 'Welcome to Earth! Earth is the third planet from our Sun and was the only place known in the universe where life has originated from and first found habitability. While Earth may not contain the largest volumes of water in our Solar System, only Earth sustains liquid surface water, extending over 70% of the Earth with its ocean, making Earth an ocean world.',
      distance_from_earth_km = 0,
      mass_measured_in_earths = 1,
      volume_measured_in_earths = 1,
      mean_density_in_g_cm_cubed = 5.513,
      surface_gravity_in_m_squared = 9.806,
      escape_velocity_in_km_per_sec = 11.186,
      synodic_rotation_period_in_days = 1,
      temperature_in_k = 287
    )
    mars = Planet(
      name = 'Mars',
      description = 'Welcome to Mars! Mars is the fourth planet from our Sun and is the third largest and massive terrestrial object in our Solar System. Mars has surface features such as impact craters, valleys, dunes, and polar ice caps. Mars has two small, irregularly shaped moons, Phobos and Deimos. Some of the most notable surface features on Mars include Olympus Mons, the largest volcano and highest-known mountain in our Solar System, and Valles Marineris, one of the largest canyons in our Solar System.',
      distance_from_earth_km = 54_600_000,
      mass_measured_in_earths = 0.107,
      volume_measured_in_earths = 0.151,
      mean_density_in_g_cm_cubed = 3.933,
      surface_gravity_in_m_squared = 3.720,
      escape_velocity_in_km_per_sec = 5.027,
      synodic_rotation_period_in_days = 1,
      temperature_in_k = 209
    )
    jupiter = Planet(
      name = 'Jupiter',
      description = "Welcome to Jupiter! Jupiter is the fifth planet from our Sun and is the largest in our Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in our Solar System combined, and slightly less than one one-thousandth the mass of our Sun. Jupiter is the third brightest natural object in the Earth's night sky after the Moon and Venus, and it has been observed since prehistoric times.",
      distance_from_earth_km = 778_000_000,
      mass_measured_in_earths = 317.8,
      volume_measured_in_earths = 1321,
      mean_density_in_g_cm_cubed = 1.326,
      surface_gravity_in_m_squared = 24.79,
      escape_velocity_in_km_per_sec = 59.5,
      synodic_rotation_period_in_days = .333,
      temperature_in_k = 88
    )
    saturn = Planet(
      name = 'Saturn',
      description = 'Welcome to Saturn! Saturn is the sixth planet from our Sun and is the second-largest in our Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It has only one-eighth the average density of Earth, but is over 95 times more massive.',
      distance_from_earth_km = 1_427_000_000,
      mass_measured_in_earths = 95.159,
      volume_measured_in_earths = 763.59,
      mean_density_in_g_cm_cubed = 0.687,
      surface_gravity_in_m_squared = 10.44,
      escape_velocity_in_km_per_sec = 35.5,
      synodic_rotation_period_in_days = .333,
      temperature_in_k = 134
    )
    uranus = Planet(
      name = 'Uranus',
      description = 'Welcome to Uranus! Uranus is the seventh planet from our Sun and is named after Greek sky deity Uranus (Caelus), who in Greek mythology is the father of Cronus (Saturn), a grandfather of Zeus (Jupiter) and great-grandfather of Ares (Mars). Uranus has the third-largest planetary radius and fourth-largest planetary mass in our Solar System.',
      distance_from_earth_km = 3_000_000_000,
      mass_measured_in_earths = 14.536,
      volume_measured_in_earths = 63.086,
      mean_density_in_g_cm_cubed = 1.27,
      surface_gravity_in_m_squared = 8.69,
      escape_velocity_in_km_per_sec = 21.3,
      synodic_rotation_period_in_days = .666,
      temperature_in_k = 76
    )
    neptune = Planet(
      name = 'Neptune',
      description = 'Welcome to Neptune! Neptune is the eighth planet from our Sun and is the farthest known planet in our Solar System. It is the fourth-largest planet in our Solar System by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, and slightly more massive than its near-twin Uranus. ',
      distance_from_earth_km = 4_300_000_016,
      mass_measured_in_earths = 17.147,
      volume_measured_in_earths = 57.74,
      mean_density_in_g_cm_cubed = 1.638,
      surface_gravity_in_m_squared = 11.15,
      escape_velocity_in_km_per_sec = 23.5,
      synodic_rotation_period_in_days = .666,
      temperature_in_k = 72
    )