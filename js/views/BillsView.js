




class BillsView{
  static renderBills($target, billsResult){
    var billList = "<ul>"
    billList +=   Object.keys(billsResult).map(billKey=>{
      return  this.eachBillTemplate(billsResult[billKey])
    })
    billList+="</ul>"
    $target.html(billList)
  }

  static eachBillTemplate(bill){
    return`<li> <a href="#" class="bill-link" data-id="${bill.description}">${bill.description}</a></li>`
  }
}
