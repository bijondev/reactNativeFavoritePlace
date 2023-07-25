import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createplaceHandeler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm onCreatePlace={createplaceHandeler} />;
}

export default AddPlace;
