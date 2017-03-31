class BillsView{
  static renderBills($target, billsResult){
    var billList =   Object.keys(billsResult).map(billKey=>{
      return  this.eachBillTemplate(billsResult[billKey])
    })
    $("#user-vote").empty()
    $target.html(billList)
  }

  static eachBillTemplate(bill){
    console.log(bill)
    return`<a href="#" class="bill-link" data-id="${bill.description}"><strong>${bill.date}</strong> - ${bill.description}</a><br>`
  }
}
