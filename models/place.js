export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = Math.round(+new Date() / 1000); //new Date().toString() + Math.random().toString();
  }
}
