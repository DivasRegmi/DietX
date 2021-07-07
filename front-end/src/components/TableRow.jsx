import React from 'react';
import { View, StyleSheet } from 'react-native';


import colors from '../config/colors';


import AppText from '../components/Text'

const TableRow = ({ name, data, style, textStyle }) => {
    return (
        <View style={[styles.container, style]}>
            <AppText size='body1' style={[styles.text, textStyle]}>
                {name}
            </AppText>

            <View style={styles.dividor} />

            <AppText size='body1' style={[styles.text, textStyle]}>
                {data}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        marginVertical: 3,
        padding: 5,


    },
    dividor: {
        borderLeftWidth: 1,
        borderLeftColor: '#a0a0a0'

    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: colors.text.subTitle

    }
})

export default TableRow;
