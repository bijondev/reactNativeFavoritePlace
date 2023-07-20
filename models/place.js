class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = Math.round(+new Date() / 1000); //new Date().toString() + Math.random().toString();
  }
}
