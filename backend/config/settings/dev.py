from .common import *

INSTALLED_APPS += [
    # third Apps
    "debug_toolbar"
]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

INTERNAL_IPS += [
    "127.0.0.1",
]

DATABASES = {
    "default": {
        "ENGINE": 'django.db.backends.postgresql',
        "HOST": 'localhost',
        "USER": 'postgres',
        "PASSWORD": 'elql==159',
        "NAME": 'instaDB',
        'PORT': "5432",
    },
}
