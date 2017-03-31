
class BillDetailsView{
  static renderNominations($target, billDetailsResult){
    let nomination = `<h1>Nominee: ${billDetailsResult.nomination.name}</h1> <h2>To: ${billDetailsResult.nomination.agency}</h2> <p>${billDetailsResult.nomination.description}</p>`
    $target.empty()
    $target.html(nomination)
  }

  static renderRealBills($target, billDetailsResult){
    let billData = `<h1>Bill: ${billDetailsResult.bill} - ${billDetailsResult.title}</h1> <h3>Sponsor: ${billDetailsResult.sponsor}</h3>`+ billDetailsResult.summary + `<a href="${billDetailsResult.govtrack_url}" target="_blank">Full details available here</a><br>`
    $target.empty()
    $target.html(billData)
  }
}
