class BillController{

  constructor($target, billDetailController){
    this.$target = $target
    this.billDetailController = billDetailController
    this.attachListeners()
  }

  render(billsResult){
    BillsView.renderBills(this.$target, billsResult)
  }

  attachListeners(billDetailController){
    this.$target.on("click", "a.bill-link", (event)=>{
      event.preventDefault()
      let id =$(event.currentTarget).data("id")
      BillDetail.find(id)
      .then(billDetailsResult=>{
        this.billDetailController.render(billDetailsResult)
      })
    })
  }



}
