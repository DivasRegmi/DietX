// const obj = {
//   uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_8d31f392373345098cf40c19f2be8993',
//   calories: 115,
//   totalWeight: 223,
//   dietLabels: [],
//   healthLabels: [],
//   cautions: [],
//   totalNutrients: {},
//   totalDaily: {},
// };

// const fact = {
//   CHOCDF: {
//     label: 'Carbs',
//     quantity: 25.134200000000003,
//     unit: 'g',
//   },

//   FAT: {
//     label: 'Fat',
//     quantity: 0.3094,
//     unit: 'g',
//   },

//   FIBTG: {
//     label: 'Fiber',
//     quantity: 4.368,
//     unit: 'g',
//   },

//   PROCNT: {
//     label: 'Protein',
//     quantity: 0.4732,
//     unit: 'g',
//   },
//   SUGAR: {
//     label: 'Sugars',
//     quantity: 18.9098,
//     unit: 'g',
//   },
// };

export const selectFacts = (obj) => {
  const { CHOCDF, FAT, FIBTG, PROCNT, SUGAR } = obj;
  const arr = [];
  arr.push(CHOCDF);
  arr.push(FAT);
  arr.push(FIBTG);
  arr.push(PROCNT);
  arr.push(SUGAR);

  return arr;
};
