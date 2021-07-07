import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache';

export const storeData = async (key, value) => {
  try {
    const data = await getData(key);
    if (data) {
      let arr = data;
      arr.push(value);
      const jsonValue = JSON.stringify(arr);
      await AsyncStorage.setItem(prefix + key, jsonValue);
    } else {
      let arr = [];
      arr.push(value);
      const jsonValue = JSON.stringify(arr);
      await AsyncStorage.setItem(prefix + key, jsonValue);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(prefix + key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const deleteData = async (key, name) => {
  try {
    const data = await getData(key);
    if (data) {
      newdata = data.filter((obj) => {
        return obj.name !== name;
      });
      const jsonValue = JSON.stringify(newdata);
      await AsyncStorage.setItem(prefix + key, jsonValue);
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeSingleData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(prefix + key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
