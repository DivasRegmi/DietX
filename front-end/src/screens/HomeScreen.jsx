import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Button from '../components/Button';
import AppText from '../components/Text';
import Screen from '../components/Screen';
import colors from '../config/colors';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import Circle from '../components/Circle';
import Divider from '../components/Divider';
import ProgressBarContainer from '../components/ProgressBarContainer';
import Card1 from '../components/Card/Card1';

import routes from '../navigation/routes';
import { getData } from '../utils/cache'
import { foodCalories, sectionCal } from '../utils/saveData'
import { calSub } from '../utils/formula'

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState();
  const [totalCalories, setTotalCalories] = useState(0)
  const [sectionCalState, setSectionCal] = useState()
  const [foodCal, setFoodCal] = useState()
  const [update, setUpdate] = useState(0)



  useEffect(() => {
    (async () => {
      const totalCal = await getData("totalCalorie")
      const sactionCalores = await sectionCal()
      const foodCal = await foodCalories()
      setTotalCalories(totalCal)
      setSectionCal(sactionCalores)
      setFoodCal(foodCal)
    })()


  }, []);


  const handelCalculate = () => {
    navigation.navigate(routes.CALCULATOR);
  };

  const handelSearch = () => {
    navigation.navigate(routes.FOOD_FACTS, { search })
    setSearch('')
  }
  const handelSwipeDown = () => {

  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <Screen>

      <ScrollView>
        <SearchBar placeholder="Search food" onChangeText={setSearch} value={search} onPressSearch={handelSearch} />
        <GestureRecognizer onSwipeDown={handelSwipeDown} config={config}>
          <Banner source={require('../assets/veg.png')} />
        </GestureRecognizer>




        <View style={styles.calculatorContainer}>
          <View style={styles.circlesRow}>
            <Circle primaryText={totalCalories} secondaryText="Goals" />
            <AppText>-</AppText>
            <Circle
              primaryText={foodCal}
              secondaryText="Food"

            />
            <AppText>=</AppText>

            <Circle
              primaryText={calSub(totalCalories, foodCal)}

              secondaryText="Rem"
            />
          </View>

          <Divider />

          <View style={styles.progressBarContainer}>
            <ProgressBarContainer
              progress={0.2}
              color={colors.secondary.dark}
              title="Carbohydrates"
              subTitle="80g of 350g"
            />
            <ProgressBarContainer
              progress={0.6}
              color={colors.secondary.secondary}
              title="Protein"
              subTitle="80g of 120g"
            />
            <ProgressBarContainer
              progress={0.4}
              color={colors.secondary.light}
              title="Fat"
              subTitle="20g of 50g"
            />
          </View>
          <Button title="Calculate" onPress={handelCalculate} />
        </View>

        <View style={styles.cardContainer}>
          <Card1
            image={require('../assets/brakefast.jpg')}
            title="Breakfast"
            subTitle="Eggs,Banana,Tea"
            calorie={sectionCalState ? sectionCalState.breakfastCal : 0}
            onPress={() => navigation.navigate(routes.ADDFOOD, { name: "Breakfast" })}
          />
          <Card1
            image={require('../assets/Lunch.jpg')}
            title="Lunch"
            subTitle="Rice,Eggs,Veg"
            calorie={sectionCalState ? sectionCalState.lunchCal : 0}
            onPress={() => navigation.navigate(routes.ADDFOOD, { name: "Lunch" })}
          />
          <Card1
            image={require('../assets/dinner.jpg')}
            title="Dinner"
            subTitle="Rice,Dhal,Veg"
            calorie={sectionCalState ? sectionCalState.dinnerCal : 0}
            onPress={() => navigation.navigate(routes.ADDFOOD, { name: "Dinner" })}
          />
          <Card1
            image={require('../assets/snacks.jpg')}
            title="Snacks"
            subTitle="Eggs,Banana,Tea"
            calorie={sectionCalState ? sectionCalState.snackCal : 0}
            onPress={() => navigation.navigate(routes.ADDFOOD, { name: "Snacks" })}
          />
        </View>
      </ScrollView>

    </Screen >
  );
}

const styles = StyleSheet.create({

  calculatorContainer: {
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },

  circlesRow: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardContainer: {
    // marginTop: 10,
    // backgroundColor: colors.white,
  },
});

export default HomeScreen;
