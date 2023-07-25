import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";

function Map({ navigation, route }) {
  const initoalLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setSelectedLocation] = useState(initoalLocation);

  const region = {
    latitude: initoalLocation ? initoalLocation.lat : 37.78,
    longitude: initoalLocation ? initoalLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationhandeler(event) {
    if (initoalLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  }

  const savePickedLocationHandeler = useCallback(() => {
    // console.log(selectedLocation);
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initoalLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandeler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandeler, initoalLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationhandeler}
    >
      {selectedLocation && (
        <Marker
          title="picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
