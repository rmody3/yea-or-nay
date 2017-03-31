class OfficialController{
  constructor($target, officials, billController){
    this.$target = $target
    this.officials = officials
    this.billController = billController
    this.attachListeners()
    this.render()
  }

  render(){
    OfficialView.renderOfficials(this.$target, this.officials)
  }

  attachListeners(){
    this.$target.on("click", "a.rep-link", (event)=>{
      event.preventDefault()
      let id =$(event.currentTarget).data("id")
      Bill.find(id)
      .then(billsResult=>{
        this.billController.render(billsResult)
      })
    })
  }
}
