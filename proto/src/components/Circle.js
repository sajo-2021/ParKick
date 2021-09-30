import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';

import MapView from 'react-native-maps';
import Marker from 'react-native-maps';



const Circle = () => {
  return (
    <MapView
      style = {styles.main_map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      }}>
      <MapView.Marker
        coordinate={{latitude:37.8025259,longitude:-122.4351431}}
        title = {'A'}/>
      <MapView.Marker
        coordinate={{latitude:37.7896386,longitude:-122.421646}}
        title = {'A'}/>
      </MapView>
  );
}

const styles = StyleSheet.create({
 main_map: {
    width: '100%',
    height: '100%',
  },
});
export default Circle
