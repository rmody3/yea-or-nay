class Official {
  constructor(name, chamber){
    this.name = name
    this.chamber = chamber
  }

  static all(){
    //returns all officials
  }

  static getChamberOfficials(chamber){
    return OfficialApi.get(chamber)
    .then(response=>{
      response["results"][0]["members"].forEach(member => {
        let name = member.first_name + " " + member.last_name
        let splitName = name.split(" ")
        name = splitName[0] + " " + splitName[splitName.length -1]
        let officialInfoObject = {"memberId": member.id, "name": name, "chamber": chamber }
        store.add("official", name, officialInfoObject)
      })
    })
    //gets all officials from API and saves them as instances
  }



  // function getRepList(chamber) {
    // $.ajax({
      // url: baseurl + "115/" + chamber + "/members.json",
      // headers: {"X-API-Key": propublicaKey}})
      // .done((response)=>{
      //   response["results"][0]["members"].forEach(member => {
      //
      //     let name = member.first_name + " " + member.last_name
      //     let splitName = name.split(" ")
      //      name = splitName[0] + " " + splitName[splitName.length -1]
      //     allReps[name] = member.id
      //     })
      //   })
      // }

  static byAddress(address) {
    return AddressApi.get(address)
    .then(
      (result)=> {
      var reps = result["officials"]
      var yourReps = []
      reps.forEach((rep)=>{
        let splitName = rep.name.split(" ")
        let name = splitName[0] + " " + splitName[splitName.length - 1]
        yourReps.push(store.find("official",name))
      })
      console.log(yourReps)
      return yourReps
     })
    }

  static findByName(name){
    //sets and returns memberID
  }
}


  // findMemberId() {
  //   this.memberId = allReps[this.name]
  //   console.log(this.name, this.memberId)
  //   return this.memberId
  // }
