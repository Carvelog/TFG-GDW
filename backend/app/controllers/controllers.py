import os, random, string, json, errno

from flask_restful import Resource
from flask import request, redirect, jsonify, Response
from werkzeug.utils import secure_filename

from database.models import Image
from .utils import uuid, allowedFileExtension

class ok(Resource):
  def get(self):
    return "ok"

class uploadImage(Resource):
  def post(self):
    methods=['POST']

    if request.method == 'POST':

      # if 'image' not in request.files:
      #   return redirect(request.url), 400 # y devuelve un status 400

      image = request.files['image']

      if not os.path.exists(Config.UPLOAD_FOLDER):
        try:
          os.makedirs(Config.UPLOAD_FOLDER)
        except OSError as e:
          if e.errno != errno.EEXIST:
            raise

      if image and allowedFileExtension(image.filename):
        image.filename = uuid(image.filename)

        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        image_uuid = uuid()

        Image(
          uuid = image_uuid,
          imageName = image.filename,
          imagePath = os.path.abspath(Config.UPLOAD_FOLDER)
        ).save()

        response = jsonify(
          uuid = image_uuid,
          imageName = image.filename
        )

        return response

      return {'message':'Invalid extension file'}, 406
    
    return {'message':'Invalid method'}, 405


class getDiagnosis(Resource):
  def get(self, uuid):
    methods=['GET']

    if request.method == 'GET':
      image = Image.objects.get(uuid=uuid).to_json()

      imageDict = json.loads(image)
      
      if ("diagnosisResult" in imageDict):
        response = jsonify(
          diagnosisResult = imageDict['diagnosisResult']
        )
        return response
      else:
        return Response(None, status = 200)

    return {'message':'Invalid method'}, 405


from app import app
from config import Config