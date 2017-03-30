class AddressApi {

  static get(address){
    return $.get(`https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=AIzaSyBEC89A8IPwzvsY9XGI1RFXJSyubOURnaY&address=` + address)
  }
}
