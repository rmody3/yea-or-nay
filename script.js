const baseurl = "https://api.propublica.org/congress/v1/"
const propublicaKey = "xmCA1Av1H07lpXRoKF6kjhjup7QgGNu8bTnUfmlc"
const googleKey = "AIzaSyBEC89A8IPwzvsY9XGI1RFXJSyubOURnaY"
const google = `https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=${googleKey}&address=`

var allReps = {}
var yourReps = []
var allRepVotes = {}


$(function () {
  getRepList("house")//gets entire list of reps from current congress
  getRepList("senate")//gets entire list of senators from current congress
  $("#address-search").on("submit", function(event) {
    yourReps = []
    $("#votes").empty()
    event.preventDefault()
    var address = $('#address').val()
    $.get(google + address, (result)=> {
      var reps = result["officials"]
      reps.forEach((rep)=>{
        let splitName = rep.name.split(" ")
        let name = splitName[0] + " " + splitName[splitName.length -1]

        var aRep = new Representative(name)
        aRep.findMemberId()
        yourReps.push(aRep)
      })
      var repTable = "<tr><th>Your Representatives</th></tr>"
      repTable += `<tr><td><a href="#" class="rep-link" data-id= "${yourReps[0].memberId}"> Senate: ${reps[0].name} </a></td></tr>`
      repTable += `<tr><td><a href="#" class="rep-link" data-id= "${yourReps[1].memberId}"> Senate: ${reps[1].name}</a></td></tr>`
      repTable += `<tr><td><a href="#" class="rep-link" data-id= "${yourReps[2].memberId}"> Congress: ${reps[2].name}</a></td></tr>`
      $("#reps").html(repTable)
      addRepLinks()
    })
  })

})

function getRepList(chamber) {
  $.ajax({
    url: baseurl + "115/" + chamber + "/members.json",
    headers: {"X-API-Key": propublicaKey}})
    .done((response)=>{
      response["results"][0]["members"].forEach(member => {

        let name = member.first_name + " " + member.last_name
        let splitName = name.split(" ")
         name = splitName[0] + " " + splitName[splitName.length -1]
        allReps[name] = member.id
        })
      })
    }

//["On Passage of the Bill", "On the Nomination", "On Motion to Suspend the Rules and Pass", "On the Amendment"]

function addRepLinks(){
  $(".rep-link").on('click', function () {
    allRepVotes = {}
    var memberId = $(this).data("id")
    $.ajax({
      url: baseurl + "members/"+memberId+"/votes.json",
      headers: {"X-API-Key": propublicaKey}})
      .done(response => {
        var votes = response["results"][0]["votes"]
        var voteList = "<ul>"
        votes.forEach((vote)=>{
          if(vote.question.match (/.*(Passage|Nomination|Suspend the Rules and Pass).*/)){
          // voteList += `<li>${vote.position}-${vote.description}</li>`remove reps vote
            voteList += `<li> <a href="#" class="vote-link" data-id="${vote.description}">${vote.description}</a></li>`//create link
            allRepVotes[vote.description] = vote
          }
          voteList+="</ul>"

        })
        //console.log(voteList);
        $("#detail-container").html(voteList)

        voteDetail()
      })
    })
}

function voteDetail(){
  $("#detail-container").on("click", "a.vote-link", (event)=>{

    event.preventDefault()
    var voteId = $(event.currentTarget).data("id")
    var vote = allRepVotes[voteId]

    var voteInfo = ""
    if(vote.nomination){
      voteInfo = `<h1>Nominee: ${vote.nomination.name}</h1> <h2>To: ${vote.nomination.agency}</h2> <p>${vote.description}</p>`
      $("#detail-container").html(voteInfo)

    }else{
      $.ajax({
        url: vote.bill.bill_uri,
        headers: {"X-API-Key": propublicaKey}})
        .done(response => {console.log(response)
          let billData = response["results"][0]
          voteInfo = `<h1>Bill: ${billData.bill} - ${billData.title}</h1> <h3>Sponsor: ${billData.sponsor}</h3><a href="${billData.govtrack_url}" target="_blank">Full details available here</a>` + billData.summary
          $("#detail-container").html(voteInfo)
        })
    }
    userVote(vote)
  })
}

function userVote(vote){
  var userResponse = ""
  var voteForm = `<form id="vote-form">
  <h2>How would YOU vote?</h2>
  <input type="radio" name="vote" value="Yes"> YES<br>
  <input type="radio" name="vote" value="No"> NO<br>
    <h4>Submit your vote to see how your elected official voted on this issue</h4>
    <input type="submit">
  </form>`
  $("#user-vote").html(voteForm)
  $("#vote-form").on("submit", function(event) {
    event.preventDefault()
    if(this.vote.value===vote.position){
      var agree = "Looks like you agree, in this case, congrats!"
    } else {
      var agree = "Too bad, vote for a new Representative"
    }
    let result = `<h2>
    You voted ${this.vote.value}, your Representative voted ${vote.position}.<br>
    ${agree}</h2>`
    $("#user-vote").html(result)
    debugger
  })
}


class Representative {
  constructor(name) {
    this.name = name
  }

  findMemberId() {
    this.memberId = allReps[this.name]
    console.log(this.name, this.memberId)
    return this.memberId
  }
}
