from .db import db

class Image(db.Document):
    uuid = db.StringField(required=True, unique=True, nullable=False)
    imageName = db.StringField(required=True)
    b64Image = db.BinaryField(required=True)
    diagnosisResult = db.BooleanField()
    metadata = db.ListField(db.StringField())