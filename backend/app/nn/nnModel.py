from tensorflow.keras.applications.xception import Xception
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.applications.vgg19 import VGG19
from tensorflow.keras.applications.resnet50 import ResNet50
from keras.applications.resnet_v2 import ResNet50V2
from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2
from tensorflow.keras.applications.mobilenet import MobileNet
from tensorflow.keras.applications.densenet import DenseNet121
from tensorflow.keras.applications.nasnet import NASNetMobile
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2

from tensorflow.keras.layers import Dense, Input, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import RMSprop

from sklearn.metrics import roc_curve
from sklearn.metrics import roc_auc_score
from sklearn.metrics import precision_recall_curve
from sklearn.metrics import f1_score
from sklearn.metrics import auc

from keras.preprocessing import image

from math import ceil

import matplotlib.pyplot as plt

import datetime

import numpy as np
from numpy import savetxt

from shutil import copyfile

import os

# Ubicación del conjunto de test y de los resultados.
# TEST_SET_PATH = '/home/carlos/Documentos/TFG/neuralNetwork/refuge_crop_test/test400'
TEST_SET_PATH = '/home/carlos/Documentos/TFG/neuralNetwork/api/temp/sc4owa8eyni/'

#### CAMBIAR AQUÍ: LA RUTA DEL DIRECTORIO DE RESULTADOS
# BASE_RESULTS = '/home/carlos/Documentos/TFG/neuralNetwork/results'
WEIGHT_PATH = '/home/carlos/Documentos/TFG/neuralNetwork/api/model_weight'


BATCH_SIZE = 32
INPUT_SIZE_BY_NETWORK = {
    'vgg19': 224
}


def get_base_model(network, input_size):
    input_tensor = Input(shape=(input_size, input_size, 3))
    
    if network == 'xception':
        base_model = Xception(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'vgg16':
        base_model = VGG16(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'vgg19':
        base_model = VGG19(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'resnet50':
        base_model = ResNet50(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'resnet50v2':
        base_model = ResNet50V2(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'inceptionv3':
        base_model = InceptionV3(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'inceptionresnetv2':
        base_model = InceptionResNetV2(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'mobilenet':
        base_model = MobileNet(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'densenet':
        base_model = DenseNet121(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'nasnetmobile':
        base_model = NASNetMobile(input_tensor=input_tensor, weights='imagenet', include_top=False)
    elif network == 'mobilenetv2':
        base_model = MobileNetV2(input_tensor=input_tensor, weights='imagenet', include_top=False)
    else:
        print('Network unknown')
        return ''
    
    return base_model

def build_model(network, input_size):
    # Cambiar el base_model en función de la red que vayamos a utilizar
    base_model = get_base_model(network, input_size)
    if base_model == '':
        print('Network unknown')
        return
        
    # Añadimos sólo GlobalAveragePooling2D, igual que los de ACRIMA
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    predictions = Dense(2, activation='softmax')(x)
    model = Model(inputs=base_model.input, outputs=predictions)
    # return base_model, model
    return model

def evaluate_network_results(model, results_path, input_size, test_set_path, batch_size):
    test_batches = ImageDataGenerator(rescale=1./255).flow_from_directory(test_set_path, target_size=(input_size, input_size), batch_size=batch_size, class_mode = None, shuffle=False)
    predictions = model.predict(test_batches)

    pred_normal = predictions[:,0]
    pred_glaucoma = predictions[:,1]
    
    return pred_glaucoma
    

# Beginning of the evaluations

# Nombre de las redes que vamos a usar para la evaluación. En función del nombre
# se leerá la subcarpeta correspondiente dentro de la carpeta de resultados.

network = 'vgg19'

def init_model():

    results_path = WEIGHT_PATH + '/' + network
    # Check if weights file exists
    if not os.path.exists(results_path + "/" + 'fold_final_w_net.h5'):
        print('Weights file for network ' + network + ' does not exist')
        return 'error'
    
    input_size = INPUT_SIZE_BY_NETWORK[network]

    model = build_model(network, input_size)
    model.compile(RMSprop(lr=1e-5), loss='categorical_crossentropy', metrics=['accuracy'])
    model.load_weights(results_path + "/" + 'fold_final_w_net.h5')
    
    return model


def evaluate(model, path):
    results_path = WEIGHT_PATH + '/' + network
    input_size = INPUT_SIZE_BY_NETWORK[network]

    predictions = evaluate_network_results(model, results_path, input_size, path, BATCH_SIZE)

    return {'pred': predictions}


# init_model()