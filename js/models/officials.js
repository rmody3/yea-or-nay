class Official {
  constructor(name, chamber){
    this.name = name
    this.chamber = chamber
  }

  static all(){
    //returns all officials
  }

  static getAllOfficials(){
    //gets all officials from API and saves them as instances
  }

  static byAddress(address) {
    return AddressApi.get(address)
    //gets all officials that for searched address
  }

  static findByName(name){
    //sets and returns memberID
  }
}
