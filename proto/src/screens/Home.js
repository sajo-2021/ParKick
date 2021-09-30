import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import MapView from 'react-native-maps';

const Home = ({navigation}) => {

  return (
    <View style = {{flex: 1}}>
    <MapView
      style = {styles.main_map}
      initialRegion={{
        latitude: 37.584061229881925,
        longitude: 127.05877709643458,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221,
      }}
    />
    <View style = {styles.btn}>
      <Button title=" + "
              onPress={() => navigation.navigate('Login')}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_map: {
    width: '100%',
    height: '100%',
  },
  btn:{
    position: 'absolute',
    right: 30,
    bottom: 40,
  }

});

export default Home;
