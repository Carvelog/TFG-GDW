import os, random, string, json, errno, base64, cv2
import numpy as np

ALLOWED_EXTENSIONS = {'jpg'}
UID_LENGTH = 30

def allowedFileExtension(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generateRandomString():
  return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for i in range(UID_LENGTH))

def uuid(filename=None):
  if filename:
    newFileName = generateRandomString()
    ext = filename.rsplit(".", 1)[1]

    return newFileName + '.' + ext
  else:
    return generateRandomString()

def processData():

  dim = (width, height)

  im_bytes = base64.b64decode(base64Image)
  im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
  img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

  image_resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
  image_cropped = image_resized[y:(crop_height+y), x:(crop_width+x)]

  retval, buffer = cv2.imencode('.jpg', image_cropped)
  b64Image = base64.b64encode(buffer)

  return jsonify(crop = b64Image.decode('utf-8'))