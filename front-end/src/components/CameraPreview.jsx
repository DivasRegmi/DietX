import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

import * as tf from '@tensorflow/tfjs'
import { fetch } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as jpeg from 'jpeg-js'

import routes from '../navigation/routes';
import Button from './Button';
import Screen from '../components/Screen'
import AppText from '../components/Text'
import colors from '../config/colors';
import Icon from '../components/Icon'


const CameraPreview = ({ photo, setPreviewVisible, navigation }) => {

  const [isModelReady, setIsModelReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [prediction, setPrediction] = useState()
  const [model, setmodel] = useState()
  const [disable, setDisable] = useState(false)





  useEffect(() => {
    (async () => {
      await tf.ready()
      const model = await mobilenet.load();
      setmodel(model)
      setIsModelReady(true)
      setLoading(false)
    }
    )()
  }, [])

  useEffect(() => {
    setLoading(false)

  }, [prediction]);



  const classifyImage = async () => {
    try {
      const imageAssetPath = Image.resolveAssetSource({ uri: photo.uri })
      console.log('ImageAssert', imageAssetPath);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
      console.log('responce');
      const rawImageData = await response.arrayBuffer()
      const imageTensor = imageToTensor(rawImageData)
      const predictions = await model.classify(imageTensor)
      setPrediction(predictions)
      console.log(predictions)
    } catch (error) {
      console.log(error)
    }
  }

  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0 // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]

      offset += 4
    }

    return tf.tensor3d(buffer, [height, width, 3])
  }


  // classifyImage()

  const handelPredict = () => {
    console.log('clicked...');
    classifyImage()
    setLoading(true)
    setDisable(true)
  }

  const handelNavigation = () => {
    const foods = prediction[0].className
    const food = foods.split(',')
    navigation.navigate(routes.FOOD_FACTS, { search: `${food[0]},100g` })

  }


  return (
    <Screen style={styles.container}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.image}
      />
      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.secondary.secondary} />
        </View>
      }




      {prediction && <View style={styles.predictionText}>
        <AppText size='h4' style={styles.text}>{prediction[0].className}</AppText>
      </View>}

      <TouchableOpacity onPress={setPreviewVisible} style={styles.backBtn}>
        <Icon name='arrow-back' materialIcons size={48}
          backgroundColor={colors.primary.primary}
        />
      </TouchableOpacity>
      <View style={styles.btnsContainer}>



        {!isModelReady && < Button title="Loading model..." disabled={true} />}
        {isModelReady && !prediction && <Button title="Prediction" onPress={handelPredict} materialIcons disable={disable} />}

        {prediction && <Button title="Facts" onPress={handelNavigation} materialIcons />}

      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },

  predictionText: {
    position: 'absolute',
    width: '100%',
    backgroundColor: colors.primary.dark,
    padding: 5,
    alignItems: 'center',
    borderRadius: 30,
    top: 10
  },
  text: {
    color: "#fff",

  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 0
  }
});

export default CameraPreview;

// const CameraPreview = () => {
//     console.log('sdsfds', photo);
//     return (

//     );
//   };
