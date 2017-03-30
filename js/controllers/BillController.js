class BillController{

  constructor($target){
    this.$target = $target
    this.attachListeners()
  }

  render(billsResult){
    BillsView.renderBills(this.$target, billsResult)
  }

  attachListeners(){
    this.$target.on("click", "a.vote-link", (event)=>{
      event.preventDefault()

    console.log(this)
    })
  }



}
