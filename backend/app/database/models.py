from .db import db
from datetime import datetime

class Image(db.Document):
    uuid = db.StringField(required=True, unique=True, nullable=False)
    b64Image = db.BinaryField(required=True)
    diagnosisResult = db.FloatField()
    metadata = db.ListField(db.StringField())
    date = db.DateTimeField(default=datetime.now)
    cropData = db.DictField()