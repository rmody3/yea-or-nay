class BillDetailController{

  constructor($target){
    this.$target = $target
  }

  render(billDetailsResult){
    if (billDetailsResult.nomination){
      BillDetailsView.renderNominations(this.$target, billDetailsResult)
    } else {
      BillDetailsView.renderRealBills(this.$target, billDetailsResult)
    }
  }

}
