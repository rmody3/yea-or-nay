const googleKey = "AIzaSyBEC89A8IPwzvsY9XGI1RFXJSyubOURnaY"
const google = `https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=${googleKey}&address=`
class AddressApi {
  static get(address){
    return $.get(google + address)
  }
}
