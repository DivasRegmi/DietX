import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';


import AppText from '../components/Text';
import Button from '../components/Button';


const DoctorDetailsScreen = ({ navigation, route }) => {

  const { mobile, name, profile, description } = route.params

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


  const callNumber = (number) => {
    const url = `tel://${number}`;
    Linking.openURL(url);
  };
  return (

    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `http://192.168.1.64:3000/images/profile/${profile}` }} style={styles.image} />
        <AppText>{name}</AppText>
      </View>

      <AppText size="h4">Description</AppText>
      <AppText size="body2" style={styles.longText}>
        {description}
      </AppText>
      <View style={styles.inlineText}>
        <AppText>Location: </AppText>
        <AppText size="body1"> Kahtmandu</AppText>
      </View>
      <View style={styles.inlineText}>
        <AppText>Phone No: </AppText>
        <AppText size="body1">{mobile} </AppText>
      </View>

      <Button
        title="call"
        icon="phone"
        iconColor="#12E600"
        iconSize={30}
        onPress={() => callNumber(9867770377)}
        style={styles.btn}
      />
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
  },
  longText: {
    textAlign: 'justify',
    marginVertical: 10,
  },
  inlineText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  btn: {
    marginBottom: 30
  }
});

export default DoctorDetailsScreen;
