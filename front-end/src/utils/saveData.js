import { selectFacts } from './selectFacts';
import { storeData, getData } from './cache';
import { options } from '../config/options';

export const addFood = (categorie, food) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${food}`;

    const info = food.split(',');

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      let facts;

      if (
        !data.error &&
        !data.message &&
        Object.keys(data.totalNutrients).length !== 0
      ) {
        facts = selectFacts(data.totalNutrients);
        //facts will return [CHOCDF, FAT, FIBTG, PROCNT, SUGAR]

        const output = {
          name: info[0],
          calories: data.calories,
          weight: data.totalWeight,
          carbs: `${facts[0].quantity.toFixed(2)}${facts[0].unit}`,
          protein: `${facts[3].quantity.toFixed(2)}${facts[3].unit}`,
          fat: `${facts[1].quantity.toFixed(2)}${facts[1].unit}`,
        };

        storeData(categorie, output);

        resolve('resolved');
      } else {
        console.log('nodata');
        reject('errors');
      }
    } catch (error) {
      console.log(error);
    }
  });
};

function findAvg(data1, data2) {
  const avg = (parseInt(data1) + parseInt(data2)) / 2;

  return avg;
}

export const getCarbsProteinFat = async () => {
  let food = {};
  quanty = await getData('quantity');

  food.carbs = findAvg(quantity.carbs[2], quantity.carbs[3]);
  food.protein = findAvg(quantity.protein[2], quantity.protein[3]);
  food.fat = findAvg(quantity.fat[2], quantity.fat[3]);
};

export const sectionCal = async () => {
  const Breakfast = await getData('Breakfast');
  const Lunch = await getData('Lunch');
  const Dinner = await getData('Dinner');
  const Snacks = await getData('Snacks');

  let breakfastCal = 0;
  let lunchCal = 0;
  let dinnerCal = 0;
  let snackCal = 0;

  if (Breakfast) {
    Breakfast.forEach(
      (value) => (breakfastCal = breakfastCal + parseInt(value.calories))
    );
  }
  if (Lunch) {
    Lunch.forEach((value) => (lunchCal = lunchCal + parseInt(value.calories)));
  }
  if (Dinner) {
    Dinner.forEach(
      (value) => (dinnerCal = dinnerCal + parseInt(value.calories))
    );
  }
  if (Snacks) {
    Snacks.forEach((value) => (snackCal = snackCal + parseInt(value.calories)));
  }

  const totalCal = { breakfastCal, lunchCal, dinnerCal, snackCal };

  return totalCal;
};

export const foodCalories = async () => {
  const Breakfast = await getData('Breakfast');
  const Lunch = await getData('Lunch');
  const Dinner = await getData('Dinner');
  const Snacks = await getData('Snacks');

  let breakfastCal = 0;
  let lunchCal = 0;
  let dinnerCal = 0;
  let snackCal = 0;

  if (Breakfast) {
    Breakfast.forEach(
      (value) => (breakfastCal = breakfastCal + parseInt(value.calories))
    );
  }
  if (Lunch) {
    Lunch.forEach((value) => (lunchCal = lunchCal + parseInt(value.calories)));
  }
  if (Dinner) {
    Dinner.forEach(
      (value) => (dinnerCal = dinnerCal + parseInt(value.calories))
    );
  }
  if (Snacks) {
    Snacks.forEach((value) => (snackCal = snackCal + parseInt(value.calories)));
  }

  const totalCal =
    parseInt(breakfastCal) +
    parseInt(lunchCal) +
    parseInt(dinnerCal) +
    parseInt(snackCal);

  return totalCal;
};
