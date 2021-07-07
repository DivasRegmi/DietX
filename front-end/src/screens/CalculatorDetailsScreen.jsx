import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';

import * as formula from '../utils/formula'
import AppText from '../components/Text'
import Screen from '../components/Screen'
import colors from '../config/colors'
import Card2 from '../components/Card/Card2'
import Divider from '../components/Divider'

import { idealWeightObject } from '../config/heightWeight'
import { storeSingleData } from '../utils/cache';



const CalculatorDetailsScreen = ({ route }) => {
    const [carbs, setCarbs] = useState(0);
    const [quantity, setQuantity] = useState({ carbs: [0, 0, 0, 0], protein: [0, 0, 0, 0], fat: [0, 0, 0, 0] });
    const [idealWeight, setIdealWeight] = useState(0)

    // const { activity, age, gender, height, weight } = route.params
    const { activity, age, gender, height, weight } = route.params



    const findIdealWeight = (idealWeightObject) => {
        //this will give "50-60"
        const fixedHeight = parseInt(height).toFixed()
        const weight = idealWeightObject[fixedHeight]
        let avgWeight

        if (gender.male) {
            const stringWeight = weight['M']
            const weights = stringWeight.split('-')
            console.log(weights);
            avgWeight = ((parseInt(weights[0]) + parseInt(weights[1])) / 2).toFixed()
            console.log(weights[0] + weights[1]);
            console.log('I am male', avgWeight);

        } else {
            const stringWeight = weight['F']
            const weights = stringWeight.split('-')
            avgWeight = ((parseInt(weights[0]) + parseInt(weights[1])) / 2).toFixed()
            console.log('I am female', avgWeight);
        }
        return avgWeight
    }

    useEffect(() => {
        if (quantity.carbs[2] && quantity.protein[3]) {
            (async () => {
                await storeSingleData("quantity", quantity)
            })()
        }

    }, [quantity]);


    useEffect(() => {
        const calculateIdealWeight = findIdealWeight(idealWeightObject)
        setIdealWeight(calculateIdealWeight)
    }, []);

    useEffect(() => {

        (async () => {
            if (carbs) {

                await storeSingleData("totalCalorie", carbs)
            }

        })()



        const caloriePercentValue = percentToCal(carbs)
        if (idealWeight <= weight) {
            //carbs 45 to 65% of total carbs
            const carbAmount45 = caloriePercentValue[45]
            const carbAmount65 = caloriePercentValue[65]

            const carbsInGramMin = (carbAmount45 / 4).toFixed()
            const carbsInGramMax = (carbAmount65 / 4).toFixed()

            //protein 10-35% of total carbs
            const proteinAmount10 = caloriePercentValue[10]
            const proteinAmount35 = caloriePercentValue[35]

            const ptoreinInGramMin = (proteinAmount10 / 4).toFixed()
            const ptoreinInGramMax = (proteinAmount35 / 4).toFixed()


            const fatAmount20 = caloriePercentValue[20]
            const fatAmount35 = caloriePercentValue[35]

            const fatInGramMin = (fatAmount20 / 8).toFixed()
            const fatInGramMax = (fatAmount35 / 8).toFixed()

            setQuantity({
                carbs: [carbAmount45, carbAmount65, carbsInGramMin, carbsInGramMax],
                protein: [proteinAmount10, proteinAmount35, ptoreinInGramMin, ptoreinInGramMax],
                fat: [fatAmount20, fatAmount35, fatInGramMin, fatInGramMax]
            })
        } else {
            //carbs 10 to 30% of total carbs
            const carbAmount10 = caloriePercentValue[10]
            const carbAmount30 = caloriePercentValue[30]
            const carbsInGramMin = (carbAmount10 / 4).toFixed()
            const carbsInGramMax = (carbAmount30 / 4).toFixed()


            //protein 40-50% of total carbs
            const proteinAmount40 = caloriePercentValue[40]
            const proteinAmount50 = caloriePercentValue[50]

            const ptoreinInGramMin = (proteinAmount40 / 4).toFixed()
            const ptoreinInGramMax = (proteinAmount50 / 4).toFixed()

            const fatAmount30 = caloriePercentValue[30]
            const fatAmount40 = caloriePercentValue[40]

            const fatInGramMin = (fatAmount30 / 8).toFixed()
            const fatInGramMax = (fatAmount40 / 8).toFixed()

            setQuantity({
                carbs: [carbAmount10, carbAmount30, carbsInGramMin, carbsInGramMax],
                protein: [proteinAmount40, proteinAmount50, ptoreinInGramMin, ptoreinInGramMax],
                fat: [fatAmount30, fatAmount40, fatInGramMin, fatInGramMax]
            })

        }

    }, [carbs])

    useEffect(() => {



        if (gender.male) {
            const carbsAmount = formula.men_BMR(idealWeight, height, age, activity)
            setCarbs(carbsAmount)
            console.log("set carbs", carbs, carbsAmount);

        } else {
            const carbsAmount = formula.women_BMR(idealWeight, height, age, activity)
            setCarbs(carbsAmount)
            console.log("set carbs", carbs);
        }

    }, [idealWeight])







    const percentToCal = (totalCal) => {
        // to calculate 10%,20%.... of total calories
        const percent = [10, 20, 30, 35, 40, 50, 45, 65]
        const percentToCal = {}
        percent.map(item => percentToCal[item] = formula.calcPercent(item, totalCal))
        return percentToCal
    }

    return (

        <ScrollView>

            <ImageBackground source={require('../assets/vegBanner.jpg')} style={styles.textContainer}>

                <View style={styles.card}>
                    <AppText size='h3' style={styles.cardText}>{idealWeight} kg</AppText>
                    <AppText size='body2' style={styles.cardText}>Ideal weight</AppText>
                    <AppText size='subTitle2' style={styles.cardText}>According to height </AppText>
                </View>

                <View style={styles.card}>
                    <AppText size='h3' style={styles.cardText}>{carbs} </AppText>
                    <AppText size='body1' style={styles.cardText}>cal/day</AppText>
                    <AppText size="subTitle2" style={styles.cardText}>To reach your goal </AppText>
                </View>

            </ImageBackground>


            <View style={styles.container}>
                <View style={styles.firstRowText}>
                    <AppText>Goal</AppText>


                    <View style={styles.subText}>
                        <AppText>{carbs} </AppText>
                        <AppText size="subTitle1">cal</AppText>
                    </View>
                </View>
                <Divider />

                <Card2
                    title="Carbs"
                    subTitle={`${quantity.carbs[0]} - ${quantity.carbs[1]}  cal`}
                    info={`${quantity.carbs[2]} g - ${quantity.carbs[3]} g`}
                    image={require('../assets/carbs.jpg')}
                />
                <Card2
                    title="Protein"
                    subTitle={`${quantity.protein[0]} - ${quantity.protein[1]} cal`}
                    info={`${quantity.protein[2]} g - ${quantity.protein[3]} g`}
                    image={require('../assets/protein.jpg')}
                />
                <Card2
                    title="Fat"
                    subTitle={`${quantity.fat[0]} - ${quantity.fat[1]} cal`}
                    info={`${quantity.fat[2]} g - ${quantity.fat[3]} g`}
                    image={require('../assets/fat.jpg')}
                />


            </View>
        </ScrollView>


    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingBottom: 10,
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    textContainer: {
        backgroundColor: colors.white,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20,
        height: 200


    },
    card: {
        backgroundColor: colors.bgLight,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 5,
        // width: 100,
        // height: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',



    },
    cardText: {
        textAlign: 'center',
        color: colors.white

    },
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



});


export default CalculatorDetailsScreen;
