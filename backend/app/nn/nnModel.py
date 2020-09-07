from tensorflow.keras.applications.vgg19 import VGG19

from tensorflow.keras.layers import Dense, Input, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import RMSprop

from shutil import copyfile, rmtree

import os

NETWORK = 'vgg19'
# WEIGHT_PATH = os.path.abspath(os.path.join('weights')) # It does not work
WEIGHT_PATH = '/usr/src/app/nn/weights'
RESULT_PATH = WEIGHT_PATH + '/' + NETWORK

BATCH_SIZE = 32
NETWORK_INPUT_SIZE = 224

def get_base_model(network, input_size):
    input_tensor = Input(shape=(input_size, input_size, 3))
    
    if network == 'vgg19':
        base_model = VGG19(input_tensor=input_tensor, weights='imagenet', include_top=False)
    else:
        print('Network unknown')
        return ''
    
    return base_model

def build_model(network, input_size):
    base_model = get_base_model(network, input_size)
    if base_model == '':
        print('Network unknown')
        return
        
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    predictions = Dense(2, activation='softmax')(x)
    model = Model(inputs=base_model.input, outputs=predictions)
    return model

def evaluate_network_results(model, results_path, input_size, test_set_path, batch_size):
    test_batches = ImageDataGenerator(rescale=1./255).flow_from_directory(test_set_path, target_size=(input_size, input_size), batch_size=batch_size, class_mode = None, shuffle=False)
    predictions = model.predict(test_batches)

    pred_normal = predictions[:,0]
    pred_glaucoma = predictions[:,1]
    
    return pred_glaucoma

def init_model():
    # Check if weights file exists
    if not os.path.exists(RESULT_PATH + "/" + 'fold_final_w_net.h5'):
        print('Weights file for network ' + NETWORK + ' does not exist')
        return 'error'

    model = build_model(NETWORK, NETWORK_INPUT_SIZE)
    model.compile(RMSprop(lr=1e-5), loss='categorical_crossentropy', metrics=['accuracy'])
    model.load_weights(RESULT_PATH + "/" + 'fold_final_w_net.h5')
    
    return model

def evaluate(model, path):
    predictions = evaluate_network_results(model, RESULT_PATH, NETWORK_INPUT_SIZE, path, BATCH_SIZE)
    rmtree(path)
    
    return predictions
