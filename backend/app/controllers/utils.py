import os, random, string, json, errno, base64, cv2
import numpy as np

from database.models import Image

ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}
UUID_LENGTH = 30

def allowedFileExtension(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generateRandomString():
  return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for i in range(UUID_LENGTH))

def uuid(filename=None):
  if filename:
    newFileName = generateRandomString()
    ext = filename.rsplit(".", 1)[1]

    return newFileName + '.' + ext
  else:
    return generateRandomString()

def stringToB64(image):
  return  base64.b64decode(image[image.find(','):])

def cropImage(data):

  x = round(data['cropData']['x'])
  y = round(data['cropData']['y'])
  crop_width = int(data['cropData']['width'])
  crop_height = int(data['cropData']['height'])
  width = data['imageWidth']
  height = data['imageHeight']

  base64Image = stringToB64(data['b64Image'])

  dim = (width, height)

  im_arr = np.frombuffer(base64Image, dtype=np.uint8)
  img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

  image_resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
  image_cropped = image_resized[y:(crop_height+y), x:(crop_width+x)]

  retval, buffer = cv2.imencode('.jpg', image_cropped)
  b64Image = base64.b64encode(buffer)

  return b64Image

def saveImage(image, imageName):
  b64OriginalImage = stringToB64(image)
  newImageName = uuid(imageName)
  image_uuid = uuid()
  
  Image(
    uuid = image_uuid,
    imageName = newImageName,
    b64Image = b64OriginalImage
  ).save()

  return image_uuid

def processInCNN(b64croppedImage, imageName):
  if not os.path.exists(Config.TEMP_FOLDER):
    try:
      os.makedirs(Config.TEMP_FOLDER)
    except OSError as e:
      if e.errno != errno.EEXIST:
        raise

  b64cImage = b64croppedImage
  newImageName = uuid(imageName)

  with open(os.path.join(Config.TEMP_FOLDER, newImageName), "wb") as new_file:
    new_file.write(base64.decodebytes(b64cImage))

  #TODO: guarda la imagen o el nombre en una cola


from config import Config