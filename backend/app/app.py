from flask import Flask
from flask_restful import Api

from controllers.controllers import ok, uploadImage, getDiagnosis
from config import Config, DevelopmentConfig
from database.db import initializeDb

app = Flask(__name__)

app.config.from_object(DevelopmentConfig) # change by ProductionConfig
app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
app.config['MONGODB_SETTINGS'] = {
  'host': Config.MONGO_DATABASE_URI
} 

initializeDb(app)
api = Api(app)

api.add_resource(ok, '/api/ok')
api.add_resource(uploadImage, '/api/upload')
api.add_resource(getDiagnosis, '/api/diagnosis/<string:uuid>')

# -----------------------
# simulated CNN result
# -----------------------
from database.models import Image
import random
@app.route('/simulatecnn/<uuid>', methods=['POST'])
def simulate(uuid):
  Image.objects.get(uuid=uuid).update(diagnosisResult = bool(random.randint(0,1)))

  return "OK", 200

if __name__ == '__main__':
  app.run()
