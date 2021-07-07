import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';


import prompt from 'react-native-prompt-android';


import Banner from '../components/Banner';
import Colors from '../config/colors';
import AppText from '../components/Text';
import Divider from '../components/Divider';
import SwipableCard from '../components/Card/SwipableCard'
import Icon from '../components/Icon';
import CardDeleteAction from '../components/Card/CardDeleteAction'

import { addFood } from '../utils/saveData'
import { getData, deleteData } from '../utils/cache'


const AddFoodScreen = ({ navigation, route }) => {
  // const [visible, setVisible] = useState(false);
  const [food, setFood] = useState([]);
  const [totalcal, setTotalCal] = useState(0);
  const { name } = route.params




  useEffect(() => {
    const parent = navigation.dangerouslyGetParent()
    parent.setOptions({
      tabBarVisible: false
    });

    (async () => {
      // await AsyncStorage.removeItem('cache' + name);
      const foodList = await getData(name)
      setFood(foodList)

    })()
    return () =>
      parent.setOptions({
        tabBarVisible: true
      });

  }, []);

  useEffect(() => {
    let totalCal = 0

    if (food) {

      food.forEach(item => { totalCal = totalCal + item.calories })
      setTotalCal(totalCal)
      console.log(totalCal);
    }

  }, [food]);


  const handleDelete = (item) => {
    deleteData(name, item.name)
    const newFood = food.filter(food => food.name !== item.name)
    setFood(newFood)
  }
  const handelCamera = () => {
    navigation.navigate("Camera");
  };

  const submitFood = async (text) => {

    addFood(name, text).then(async () => {
      const foodList = await getData(name)
      setFood(foodList)
    })


  }


  const handelAddFood = () => {
    if (Platform.OS === 'ios') {
      prompt(
        'Enter Your Food and quantity',
        'Eg. Chicken,200g or Eggs,6',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (text) => submitFood(text)
          },
        ],
        {
          placeholder: 'Food',
        }
      );
    }


  };

  const handelSwipeDown = async () => {

    // await AsyncStorage.removeItem('cache' + name);
    const foodList = await getData(name)
    setFood(foodList)

    setFood(foodList)
    console.log(foodList);


  }



  return (
    <View style={styles.topContainer}>
      <ScrollView>
        <GestureRecognizer onSwipeDown={handelSwipeDown}>
          <Banner source={require('../assets/tea.jpg')} />
        </GestureRecognizer>
        <View style={styles.containerBox}>
          <View style={styles.firstRowText}>
            <AppText>{name}</AppText>
            <View style={styles.subText}>
              <AppText>{totalcal}</AppText>
              <AppText size="subTitle1">cal</AppText>
            </View>
          </View>
          <Divider />

          <View style={styles.cardsContainer}>

            {
              food && food.map((item, index) =>

                <SwipableCard
                  key={index}
                  title={item.name}
                  subTitle={`${item.name}, ${item.weight}g`}

                  info={`protein:${item.protein}  fat:${item.fat}`}
                  info2={`Carbs:${item.carbs}  cal:${item.calories}`}
                  image={require('../assets/food.png')}
                  swipe
                  renderRightActions={() => (
                    <CardDeleteAction onPress={() => handleDelete(item)} />
                  )}

                />)
            }

          </View>


          <Divider />
          {/* <View>
            <AppText size="subTitle1">Overall:</AppText>
            <View style={styles.infoText}>
              <View>
                <AppText size="subTitle1">Carbs:</AppText>
                <AppText size="subTitle1">Protein:</AppText>
                <AppText size="subTitle1">Fat:</AppText>
              </View>
              <View style={styles.infoTextNumber}>
                <AppText size="subTitle1">200g</AppText>
                <AppText size="subTitle1">55g</AppText>
                <AppText size="subTitle1">20g</AppText>
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handelAddFood}>
          <Icon name="plus" size={40} />
        </TouchableOpacity>
        <AppText size="body1"> Add Breakfast</AppText>
        <TouchableOpacity onPress={handelCamera}>
          <Icon name="camera" size={40} />
        </TouchableOpacity>
      </View>

      {/* <AppPrompt
        visible={visible}
        title="Enter Your Food"
        placeholder="Eg. 6 Eggs, Chicken 100g"
        onCancel={() => {
          setVisible(false);
        }}
        onSubmit={submitFood}
        style={styles.prompt}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1
  },
  containerBox: {
    marginTop: 30,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardsContainer: { minHeight: 300 },
  firstRowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    padding: 5,
  },
  subText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginLeft: 'auto',
    marginRight: 10,
  },
  infoTextNumber: {
    alignItems: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  prompt: {
    backgroundColor: '#000',
  },
});

export default AddFoodScreen;
