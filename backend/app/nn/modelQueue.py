from threading import Thread, Lock
from queue import Queue
from database.models import Image
import json
import time

from .nnModel import init_model, evaluate
from controllers.utils import saveCrop, cropImage

model = None
queue = Queue()

def load_model():
    global model
    model = init_model()
    Thread(target=processImage,).start()

def processImage():
    global queue
    with Lock():
        while True:
            id = queue.get()
            imageData = Image.objects.get(uuid=id).to_json()
            imageDict = json.loads(imageData)

            croppedImage = cropImage(imageDict)
            path = saveCrop(croppedImage)

            result = evaluate(model, path)
            Image.objects.get(uuid=id).update(diagnosisResult = result[0])

def insertInQueue(id):
    global queue
    queue.put(id)
