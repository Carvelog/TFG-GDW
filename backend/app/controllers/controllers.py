import os, random, string, json, errno, base64

from flask_restful import Resource
from flask import request, redirect, jsonify, Response, send_file
from werkzeug.utils import secure_filename

from database.models import Image
from .utils import uuid, allowedFileExtension, cropImage, saveImage, processInCNN

class ok(Resource):
  def get(self):
    return "ok!"

class downloadImage(Resource): #TODO: implementar
  def get(self, uuid):
    methods=['GET']

    if request.method == 'GET':
      image = Image.objects.get(uuid=uuid).to_json()

      imageDict = json.loads(image)

      with open(os.path.join(Config.TEMP_FOLDER, newImageName), "wb") as new_file:
        new_file.write(imageDict['b64Image'])
      
      # send_file()
      # buscar y devolver la imagen en el filesystem

    return {'message':'Invalid method'}, 405

class process(Resource):
  def post(self):
    methods=['POST']

    if request.method == 'POST':

      if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

      data = request.get_json()
      imageName = data['imageName']
    
      if allowedFileExtension(imageName):

        image_uuid = saveImage(data['b64Image'], imageName)

        b64CroppedImage = cropImage(data) # need decodify ---> base64.decodebytes(b64CroppedImage)

        processInCNN(b64CroppedImage, imageName)

        return Response(response={image_uuid}, status=200)
      
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


from config import Config