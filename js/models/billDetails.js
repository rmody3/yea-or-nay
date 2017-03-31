class BillDetail{
  static find(id){
    var billObject = store.state.bill[id]
    if(billObject.nomination){
      return new Promise(function(resolve) {
        resolve({"nomination":{
          "name": billObject.nomination.name,
          "agency": billObject.nomination.agency,
          "description": billObject.description
        }})
      });
    }else{
      return billDetailApi.get(billObject)
       .then(response => {
         return new Promise (function(resolve){
           resolve({"realBill":response["results"][0],
           "description": billObject.description
          })
        })
      })
    }
  }
}
