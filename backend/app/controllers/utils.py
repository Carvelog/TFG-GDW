import os, random, string, json, errno

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