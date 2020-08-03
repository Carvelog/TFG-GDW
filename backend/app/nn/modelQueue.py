from threading import Thread
from queue import Queue
from database.models import Image
import json

from .nnModel import init_model, evaluate
from controllers.utils import generateRandomString

model = None
queue = Queue()

def load_model():
    global model
    model = init_model()
    return Thread(target=processImage,)

def processImage():
    global queue
    while True:
        id = queue.get()
        ## leer imagen en b64 de la base de datos, identificada por el uuid
        imageData = Image.objects.get(uuid=id).to_json()
        imageDict = json.loads(imageData)
        b64Image = imageDict['b64Image']['$binary']
        ## leer coordenadas del crop
        cropCoordinates = imageDict['cropData']
        ## recortar la imagen
        croppedImage = cropImage(cropCoordinates)
        ## guardar la imagen en el directorio /temp
        ## guardar el path
        image_path = generateRandomString() + '/image/'
        path = os.path.join(app.config['UPLOAD_FOLDER'], image_path)
        if not os.path.exists(path):
            try:
                os.makedirs(path)
            except OSError as e:
                if e.errno != errno.EEXIST:
                    raise

        b64cImage = b64croppedImage
        newImageName = uuid('png')

        with open(os.path.join(Config.TEMP_FOLDER, newImageName), "wb") as new_file:
            new_file.write(base64.decodebytes(b64cImage))
        ## evaluar la imagen
        fullPath = path + newImageName
        result = evaluate(model, fullPath)
        ##procesar resultado
        
        ## guardar el resultado en la base de datos
        # Image.objects.get(uuid=id).update(diagnosisResult = result)

def insertInQueue(id):
    global queue
    queue.put(id)
