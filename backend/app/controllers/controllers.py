import os, random, string, json, errno, base64

from flask_restful import Resource
from flask import request, redirect, jsonify, Response
from werkzeug.utils import secure_filename

from database.models import Image
from .utils import uuid, allowedFileExtension, cropImage, decodeB64Image

class ok(Resource):
  def get(self):
    return "ok!"

class downloadImage(Resource):
  def get(self, uuid):
    methods=['GET']

    if request.method == 'GET':
      image = Image.objects.get(uuid=uuid).to_json()

      imageDict = json.loads(image)
      
      # buscar y devolver la imagen en el filesystem

    return {'message':'Invalid method'}, 405

class uploadImage(Resource):
  def post(self):
    methods=['POST']

    if request.method == 'POST':

      if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

      data = request.get_json()
      imageName = data['imageName']

      if allowedFileExtension(imageName):

        b64OriginalImage = decodeB64Image(data['b64Image']) # no necesita decodificar los bytes
        b64CroppedImage = cropImage(data) # necesita decodificar los bytes ---> base64.decodebytes(b64CroppedImage)

        filename = uuid(imageName)
        # filename = secure_filename(imageName)

        image_uuid = uuid()

        if not os.path.exists(Config.UPLOAD_FOLDER):
          try:
            os.makedirs(Config.UPLOAD_FOLDER)
          except OSError as e:
            if e.errno != errno.EEXIST:
              raise

        with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), "wb") as new_file:
          new_file.write(b64OriginalImage)

        # Image(
        #   uuid = image_uuid,
        #   imageName = filename,
        #   imagePath = os.path.abspath(Config.UPLOAD_FOLDER)
        # ).save()

        response = jsonify(
          uuid = image_uuid,
          imageName = filename
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