class BillDetailController{

  constructor($target){
    this.$target = $target
    this.attachListeners()
  }

  render(billDetailsResult){
    if (billDetailsResult.nomination){
      BillDetailsView.renderNominations(this.$target, billDetailsResult)
    } else {
      BillDetailsView.renderRealBills(this.$target, billDetailsResult)
    }
  }


  attachListeners(){
    $("#user-vote").on("submit", "form#vote-form", function(event){
      event.preventDefault()
      let id =$(event.currentTarget).data("id")
      var thisBill = store.state.bill[id]
      BillDetailsView.renderVoteResult(thisBill,this.vote.value)
    })
  }
}
