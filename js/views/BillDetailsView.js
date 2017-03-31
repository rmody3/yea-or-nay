
class BillDetailsView{
  static renderNominations($target, billDetailsResult){
    let nomination = `<h1>Nominee: ${billDetailsResult.nomination.name}</h1> <h2>To: ${billDetailsResult.nomination.agency}</h2> <p>${billDetailsResult.nomination.description}</p>`
    $target.empty()
    $target.html(nomination)
    this.userVote(billDetailsResult.nomination.description)
  }

  static renderRealBills($target, billDetailsResult){
    let billData = `<h1>Bill: ${billDetailsResult.realBill.bill} - ${billDetailsResult.realBill.title}</h1> <h3>Sponsor: ${billDetailsResult.realBill.sponsor}</h3>`+ billDetailsResult.realBill.summary + `<a href="${billDetailsResult.realBill.govtrack_url}" target="_blank">Full details available here</a><br>`
    $target.empty()
    $target.html(billData)
    this.userVote(billDetailsResult.description)
  }

  static userVote(id){
    var voteForm = `<form data-id="${id}" id="vote-form">
    <h2>How would YOU vote?</h2>
    <input type="radio" name="vote" value="Yes"> YES<br>
    <input type="radio" name="vote" value="No"> NO<br>
      <h4>Submit your vote to see how your elected official voted on this issue</h4>
      <input type="submit">
    </form>`
    $("#user-vote").html(voteForm)
  }

  static renderVoteResult(thisBill,userVote){
    if(userVote===thisBill.position){
      var agree = "Looks like you agree, in this case, congrats!"
    } else {
      var agree = "Too bad, vote for a new Representative"
    }
    let result = `<h2>
    You voted ${userVote}, your Representative voted ${thisBill.position}.<br>
    ${agree}</h2>`
    $("#user-vote").html(result)
  }
}
