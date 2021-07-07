import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Banner from '../components/Banner';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import DoctorCard from '../components/Card/DoctorCard';

import routes from '../navigation/routes';

const DoctorsListScreen = ({ navigation }) => {
  const [doctorList, setDoctorsList] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const handelPress = (item) => {
    navigation.navigate(routes.DOCTOR_DETAILS, item);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://192.168.1.64:3000/api/doctors");
      const data = await response.json();
      setDoctorsList(data)
      setLoading(false)
      console.log(data);
    })()
  }, []);
  return (
    <Screen>



      <Banner source={require('../assets/doctors.jpg')} />
      <AppText style={styles.topText} size="h4">
        Nutritionist
      </AppText>
      <FlatList
        data={doctorList}
        renderItem={({ item, index }) => (
          <DoctorCard
            image={{ uri: `http://192.168.1.64:3000/images/profile/${item.profile}` }}
            title={item.name}
            number={item.mobile}
            money={item.fee}
            onPress={() => handelPress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />


      {/* 
      <DoctorCard
        image={require('../assets/dr_1.png')}
        title="Bibek Bhandari"
        number={9867776755}
        money={10}
        onPress={handelPress}
      />
      <DoctorCard
        image={require('../assets/dr_1.png')}
        title="Divas Regmi"
        number={9867867856}
        money={12}
        onPress={handelPress}
      />
      <DoctorCard
        image={require('../assets/dr_1.png')}
        title="Ellon THapa"
        number={9867776755}
        money={15}
        onPress={handelPress}
      />
      <DoctorCard
        image={require('../assets/dr_1.png')}
        title="Rahul Karki"
        number={98756478655}
        money={20}
        onPress={handelPress}
      />
      <DoctorCard
        image={require('../assets/dr_1.png')}
        title="Kshitij Bhandari"
        number={9867734567}
        money={10}
        onPress={handelPress}
      /> */}

    </Screen>
  );
};

const styles = StyleSheet.create({
  topText: {
    marginTop: 10,
  },
});

export default DoctorsListScreen;
