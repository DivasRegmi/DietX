import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';




import TableRow from '../components/TableRow';
import { TouchableOpacity } from 'react-native';
import Icon from '../components/Icon';
import AppText from '../components/Text'
import colors from '../config/colors'
import ActivityIndicator from '../components/ActivityIndicator';

import { addFood } from '../utils/saveData'


import { selectFacts } from '../utils/selectFacts'

import { options } from '../config/options'

const FoodFactsScreen = ({ route, navigation }) => {
    const [data, setData] = useState()
    const [nutrition, setNutrition] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const { search: ingr } = route.params
    const foodName = ingr.split(',');

    const url = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${ingr}`

    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false
        });

        (async () => {
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setData(data)
                setLoading(false)
                console.log(data);
                if (!error && data && !data.message && data.totalWeight !== 0) {
                    setNutrition(selectFacts(data.totalNutrients))
                }
            } catch (error) {
                setError(error)
            }


        })()

        return () =>
            parent.setOptions({
                tabBarVisible: true
            });
    }, []);

    const handelAddFood = async (categorie, food) => {

        addFood(name, text).then(async () => {
            const foodList = await getData(name)
            setFood(foodList)
        })


    }



    return (
        <View style={styles.container}>

            {error && <AppText>Sorry, something went wrong</AppText>}
            {data && data.error && <AppText>Please enter food name,{data.error}</AppText>}


            <ActivityIndicator visible={loading} />


            {
                !loading && !error && data && !data.message && < ScrollView >
                    <TableRow name="Food" data="Fact" style={{ backgroundColor: colors.primary.light }} textStyle={{ fontSize: 20, color: "#000" }} />

                    <TableRow name="Calories" data={data.calories} />
                    <TableRow name="Weight" data={`${data.totalWeight.toFixed()} g`} style={{ backgroundColor: '#e0e0e0' }} />

                    {nutrition && nutrition.map((item, index) => <TableRow key={index} name={item.label} data={`${item.quantity.toFixed(2)} ${item.unit}`} style={[index % 2 && { backgroundColor: '#e0e0e0' }]} />)}

                </ScrollView>
            }

            <View style={styles.btnContainer}>
                <AppText style={styles.footerText} size='h4'>Add {foodName[0]} in your</AppText>
                <View style={styles.btns}>
                    <TouchableOpacity onPress={() => handelAddFood("Breakfast", ingr)} >
                        <Icon name='free-breakfast' materialIcons size={48} backgroundColor={colors.primary.primary} />
                        <AppText size="subTitle2">Breakfast</AppText>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => handelAddFood("Lunch", ingr)} >
                        <Icon name='food-bank' materialIcons size={48} backgroundColor={colors.primary.primary} />
                        <AppText size="subTitle2">Lunch</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handelAddFood("Dinner", ingr)}>
                        <Icon name='food-bank' materialIcons size={48} backgroundColor={colors.primary.primary} />
                        <AppText size="subTitle2">Dinner</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handelAddFood("Snacks", ingr)}>
                        <Icon name='fastfood' materialIcons size={48}
                            backgroundColor={colors.primary.primary}
                        />
                        <AppText size="subTitle2">Snacks</AppText>
                    </TouchableOpacity>
                </View>


            </View>



        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        backgroundColor: colors.white,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }, btns: {
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    footerText: {
        marginBottom: 10
    }


});

export default FoodFactsScreen;
