import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import CustomButton from "../ui/CustomButton";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitlehandeler(enteredtext) {
    setEnteredTitle(enteredtext);
  }

  function savePlacehandeler() {
    // console.log(enteredTitle);
    // console.log(pickedImage);
    // console.log(pickedLocation);
    const placeData = new Place(enteredTitle, pickedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  function takeImageHandeler(imageUri) {
    setPickedImage(imageUri);
  }
  const pickLocationHandeler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  // const screenHeight = Dimensions.get("window").height;

  return (
    <View style={{ flex: 1, paddingVertical: 15 }}>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} onChangeText={changeTitlehandeler} />
        </View>
        <ImagePicker onImageTaken={takeImageHandeler} />
        <LocationPicker onPickLocation={pickLocationHandeler} />
        <CustomButton onPress={savePlacehandeler} children="Add Place">
          Add Place
        </CustomButton>
      </ScrollView>
    </View>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
