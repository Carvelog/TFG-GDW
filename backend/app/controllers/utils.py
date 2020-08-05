import os, random, string, json, errno, base64, cv2
import numpy as np

from io import BytesIO

from skimage import io
from skimage.transform import resize

from PIL import Image
from PIL.Image import fromarray

from database.models import Image

ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}
UUID_LENGTH = 30

def allowedFileExtension(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generateRandomString():
  return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for i in range(UUID_LENGTH))

def uuid(filenameExt=None):
  if filenameExt:
    newFileName = generateRandomString()

    return newFileName + '.' + filenameExt
  else:
    return generateRandomString()

def stringToB64(image):
  return  base64.b64decode(image[image.find(','):])

def cropImage(data):

  x = round(data['cropData']['x'])
  y = round(data['cropData']['y'])
  crop_width = int(data['cropData']['width'])
  crop_height = int(data['cropData']['height'])
  width = data['resizeWidth']
  height = data['resizeHeight']

  base64Image = base64.b64decode(data['b64Image']['$binary'])

  dim = (width, height)

  im_arr = np.frombuffer(base64Image, dtype=np.uint8)
  img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

  image_resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
  image_cropped = image_resized[y:(crop_height+y), x:(crop_width+x)]

  retval, buffer = cv2.imencode('.png', image_cropped)
  b64Image = base64.b64encode(buffer)

  return b64Image

def saveImage(data):
  b64OriginalImage = stringToB64(data['b64Image'])
  image_uuid = uuid()
  
  Image(
    uuid = image_uuid,
    b64Image = b64OriginalImage,
    cropData = data['cropData'],
    resizeWidth = data['imageWidth'],
    resizeHeight = data['imageHeight']
  ).save()

  return image_uuid

def saveCrop(b64croppedImage):
  path = os.path.join(Config.TEMP_FOLDER, generateRandomString())
  image_path = path + '/image/'
  if not os.path.exists(image_path):
      try:
          os.makedirs(image_path)
      except OSError as e:
          if e.errno != errno.EEXIST:
              raise

  b64cImage = b64croppedImage
  newImageName = uuid('png')

  with open(os.path.join(image_path, newImageName), "wb") as new_file:
      new_file.write(base64.decodebytes(b64cImage))
  
  return path


from config import Config