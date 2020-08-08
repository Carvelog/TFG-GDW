import os, random, string, json, errno, base64

from flask_restful import Resource
from flask import request, redirect, jsonify, Response, send_file
from werkzeug.utils import secure_filename

from database.models import Image
from nn.modelQueue import insertInQueue
from .utils import uuid, allowedFileExtension, saveImage, cropImage

class ok(Resource):
  def get(self):
    return "ok!"

class downloadImage(Resource): #TODO: implementar
  def get(self, uuid):
    methods=['GET']

    if request.method == 'GET':
      image = Image.objects.get(uuid=uuid).to_json()
      imageDict = json.loads(image)

      croppedImage = cropImage(imageDict)

      return jsonify(
        image = croppedImage
      )

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

        image_uuid = saveImage(data)
        
        insertInQueue(image_uuid)

        ## devolver el id en un token
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