import { View, StyleSheet } from "react-native";
import OutlineButton from "../ui/OutlineButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

function LocationPicker() {
  async function verifyPermission() {
    const [locationPermissionInformation, requestPermission] =
      useForegroundPermissions();
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location permission to use this app,"
      );
      return false;
    }

    return true;
  }

  async function getLocationhandeler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = getCurrentPositionAsync();
    console.log(location);
  }

  function pickOnMapHandeler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.action}>
        <OutlineButton
          icon="location"
          size={24}
          color={Colors.primary500}
          onPress={getLocationhandeler}
        >
          Locate User
        </OutlineButton>

        <OutlineButton
          icon="map"
          size={24}
          color={Colors.primary500}
          onPress={pickOnMapHandeler}
        >
          Pick on Mape
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
