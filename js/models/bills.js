class Bill{
  static find(id){
    return billApi.get(id)
       .then(response => {
          var bills = response["results"][0]["votes"]
          bills.forEach((bill)=>{
            if(bill.question.match (/.*(Passage|Nomination|Suspend the Rules and Pass).*/)){
              store.add("bill", bill.description, bill)
            }
          })
          console.log(store.state['bill'])
          return store.state['bill']
        })
  }
}
