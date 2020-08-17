import os

MONGO_USER = os.environ['MONGO_USER']
MONGO_USER_PASSWORD = os.environ['MONGO_USER_PASSWORD']
MONGO_PORT = os.environ['MONGO_PORT']
MONGO_DATABASE_NAME = os.environ['MONGO_DATABASE_NAME']
MONGO_AUTH_MECHANISM = os.environ['MONGO_AUTH_MECHANISM']
IP = os.environ['IP']

class Config(object):
    DEBUG = False
    TESTING = False
    MONGO_DATABASE_URI = f'mongodb://{MONGO_USER}:{MONGO_USER_PASSWORD}@{IP}:{MONGO_PORT}/{MONGO_DATABASE_NAME}?authSource={MONGO_DATABASE_NAME}&authMechanism={MONGO_AUTH_MECHANISM}'
    TEMP_FOLDER = os.path.abspath(os.path.join('temp'))

class ProductionConfig(Config):
    DEBUG = False

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class TestingConfig(Config):
    TESTING = True