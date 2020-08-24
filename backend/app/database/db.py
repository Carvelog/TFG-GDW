from flask_mongoengine import MongoEngine

db = MongoEngine()

def initializeDb(app):
    db.init_app(app)