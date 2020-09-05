from flask import Flask
from flask_restful import Api
from flask_cors import CORS, cross_origin

from controllers.controllers import ok, process, getDiagnosis, downloadImage, saveMetadata
from config import Config, ProductionConfig
from database.db import initializeDb
from nn.modelQueue import load_model, processImage

app = Flask(__name__)
load_model()

app.config.from_object(ProductionConfig)
app.config['MONGODB_SETTINGS'] = {
  'host': Config.MONGO_DATABASE_URI
} 
app.config['CORS_HEADERS'] = 'Content-Type'

initializeDb(app)
api = Api(app)
CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

api.add_resource(ok, '/api/ok')
api.add_resource(process, '/api/process')
api.add_resource(getDiagnosis, '/api/diagnosis/<string:uuid>')
api.add_resource(downloadImage, '/api/download/<string:uuid>')
api.add_resource(saveMetadata, '/api/metadata/<string:uuid>')

if __name__ == '__main__':
  app.run()