import os, random, string, json, errno, base64, io

from flask_restful import Resource
from flask import request, redirect, jsonify, Response, send_file
from werkzeug.utils import secure_filename

from database.models import Image
from nn.modelQueue import insertInQueue
from .utils import uuid, allowedFileExtension, saveImage, cropImage

class ok(Resource):
  def get(self):
    return "ok!"

class downloadImage(Resource):
  def get(self, uuid):
    methods=['GET']

    if not request.method == 'GET':
      return {'message':'Invalid method'}, 405

    image = Image.objects.get(uuid=uuid).to_json()
    imageDict = json.loads(image)

    croppedImage = cropImage(imageDict)
    image = croppedImage.decode("utf-8")

    return Response(response={image}, status=200)

class process(Resource):
  def post(self):
    methods=['POST']

    if not request.method == 'POST':
      return {'message':'Invalid method'}, 405

    if not request.is_json:
      return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()
    imageName = data['imageName']
  
    if not allowedFileExtension(imageName):
      return {'message':'Invalid extension file'}, 406

    image_uuid = saveImage(data)    
    insertInQueue(image_uuid)

    return Response(response={image_uuid}, status=200)
    
class getDiagnosis(Resource):
  def get(self, uuid):
    methods=['GET']

    if not request.method == 'GET':
      return {'message':'Invalid method'}, 405

    image = Image.objects.get(uuid=uuid).to_json()
    imageDict = json.loads(image)
    
    if ("diagnosisResult" in imageDict):
      response = jsonify(
        diagnosisResult = imageDict['diagnosisResult']
      )
      return response
    else:
      return Response(None, status = 200)

class saveMetadata(Resource):
  def post(self, uuid):
    method=['POST']

    if not request.method == 'POST':
      return {'message':'Invalid method'}, 405

    if not request.is_json:
      return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()
    image = Image.objects.get(uuid=uuid).update(metadata=data)
    
    return Response(response='ok', status=200) 

from config import Config