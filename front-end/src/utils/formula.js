export const BMI = (weight_kg, height_m) => {
  const BMI = (weight_kg / Math.pow(height_m, 2)).toFixed();
  return BMI;
};

export const ideal_Weight = (height_m, BMI) => {
  const weight = (2.2 * BMI + 3.5 * BMI * (height_m - 1.5)).toFixed();

  return weight;
};

export const men_BMR = (weight_kg, height_cm, age, activity) => {
  const calories = (10 * weight_kg + 6.5 * height_cm - 5 * age + 5).toFixed();

  return activityIndicator(calories, activity);
};

export const women_BMR = (weight_kg, height_cm, age, activity) => {
  const calories = (
    10 * weight_kg +
    6.25 * height_cm -
    5 * age -
    161
  ).toFixed();
  return activityIndicator(calories, activity);
};

export const activityIndicator = (dailyCalories, activity) => {
  if (activity === 'bmr') {
    return dailyCalories;
  }
  if (activity === 'senedentary') {
    return (dailyCalories * 1.2).toFixed();
  }
  if (activity === 'light') {
    return (dailyCalories * 1.375).toFixed();
  }
  if (activity === 'moderately') {
    return dailyCalories * (1.55).toFixed();
  }
  if (activity === 'very') {
    return (dailyCalories * 1.725).toFixed();
  }
  if (activity === 'extra') {
    return (dailyCalories * 1.9).toFixed();
  }
};

export const calcPercent = (percent, total) => {
  const calc = ((percent / 100) * total).toFixed();
  return calc;
};

export const calSub = (number1, number2) => {
  if (number2 > number1) {
    return 0;
  }

  return parseInt(number1) - parseInt(number2);
};
