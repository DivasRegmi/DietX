import React from 'react';
import { View, StyleSheet } from 'react-native';

import Swipeable from "react-native-gesture-handler/Swipeable";
import Card2 from './Card2'

const SwipableCard = ({ renderRightActions, ...otherProps }) => {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Card2 {...otherProps} />
        </Swipeable>
    );
}

const styles = StyleSheet.create({})

export default SwipableCard;
