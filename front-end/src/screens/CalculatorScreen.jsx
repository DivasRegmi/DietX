import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Screen from '../components/Screen';
import AppText from '../components/Text';
import ButtonToggle from '../components/ButtonToggle';
import AppTextInput from '../components/TextInput';
import AppPicker from '../components/Picker';
import colors from '../config/colors';
import Button from '../components/Button';

import routes from '../navigation/routes'

const CalculatorScreen = ({ navigation }) => {
  const [gender, setGender] = useState({ male: true, female: false });
  const [age, onChangeAge] = useState();
  const [weight, onChangeWeight] = useState();
  const [height, onChangeHeight] = useState();
  const [activity, setActivity] = useState('bmr');
  const [errors, setErrors] = useState({ error: false, message: '' })


  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true
      });
  }, []);

  const handelMale = () => {
    setGender({ male: true, female: false });
  };
  const handelFemale = () => {
    setGender({ male: false, female: true });
  };

  const handelCalculate = () => {

    if (age && weight && height) {
      if (height < 137 || height > 213) {
        setErrors({ error: true, message: "Hegiht must be 137 to 213" })

      } else {
        setErrors({ error: false, message: "" })
        navigation.navigate(routes.CALCULATOR_DETAILS, { gender, age, weight, height, activity })

      }

    } else {
      setErrors({ error: true, message: "Filled all the forms" })
    }


  };

  return (
    <ScrollView style={styles.topContainer}>
      <View style={styles.buttons}>
        <ButtonToggle
          onPress={handelMale}
          state={gender.male}
          title="Male"
          icon="male"
          style={styles.btn}
          fontAwesome
        />
        <ButtonToggle
          testID="female"
          onPress={handelFemale}
          state={gender.female}
          title="Female"
          icon="female"
          style={styles.btn}
          fontAwesome
        />
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput
          onChangeText={onChangeAge}
          value={age}
          title="Age"
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
        />
        <AppTextInput
          onChangeText={onChangeHeight}
          value={height}
          title="Height (cm)"
          placeholder="Height"
          keyboardType="numeric"
          style={styles.input}
        />
        <AppTextInput
          onChangeText={onChangeWeight}
          value={weight}
          title="Weight (kg)"
          placeholder="Weight"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <AppText size="h2" style={styles.text}>
        Activity Level
      </AppText>
      <AppPicker
        selectedValue={activity}
        onValueChange={(itemValue, itemIndex) => setActivity(itemValue)}
      >
        <Picker.Item label="Basal Metabolic Rate" value="bmr" />
        <Picker.Item
          label="Sedentary: little or no exersise"
          value="senedentary"
        />
        <Picker.Item
          label="Light:exercise 1-3 times/week"
          value="light"
        />
        <Picker.Item
          label="Moderate:exercise 4-5 times/week"
          value="moderately"
        />

        <Picker.Item
          label="Very Active:intense 6-7 times/week"
          value="very"
        />
        <Picker.Item
          label="Extra Active:very intense exercise daily"
          value="extra"
        />
      </AppPicker>

      {
        errors.error && <AppText size='body2' style={{ color: colors.red }}>{errors.message}</AppText>
      }

      <Button title="Calculate" onPress={handelCalculate} />

      <View style={styles.textGroup}>
        <View>
          <AppText size="body1">Exercise: </AppText>
          <AppText size="subTitle1" style={styles.subText}>
            15-30 minutes of elevated heart rate activity.
          </AppText>
        </View>
        <View>
          <AppText size="body1">Intense exercise: </AppText>
          <AppText size="subTitle1" style={styles.subText}>
            45-120 minutes of elevated heart rate activity.
          </AppText>
        </View>
        <View>
          <AppText size="body1">Very intense exercise: </AppText>
          <AppText size="subTitle1" style={styles.subText}>
            2+ hours of elevated heart rate activity.
          </AppText>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: colors.white,
    padding: 1,
    paddingBottom: 20,
    borderRadius: 20,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
  },
  btn: {
    paddingHorizontal: 5,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
    marginHorizontal: 7,
  },
  input: {
    width: '100%',
    color: colors.dark,
  },

  text: {
    marginTop: 15,
    marginLeft: 10,
  },
  textGroup: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  subText: {
    marginLeft: 30,
    marginTop: 3,
  },
});

export default CalculatorScreen;
