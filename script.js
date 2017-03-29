const baseurl = "https://api.propublica.org/congress/v1/"


const google = `https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=${googleKey}&address=`
var allReps = {}
var yourReps = []
// function convertAddress(address){
//   return address.replace(" ", "%20")
// }

$(function () {
  getRepList("house")
  getRepList("senate")
  $("#address-search").on("submit", function(event) {
    yourReps = []
    event.preventDefault()
    var address = $('#address').val()
    $.get(google + address, (result)=> {
      var reps = result["officials"]
      reps.forEach((rep)=>{
        var aRep = new Representative(rep.name)
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
        allReps[name] = member.id
      })
    })
}

function addRepLinks(){
  $(".rep-link").on('click', function () {
    var memberId = $(this).data("id")
    $.ajax({
      url: baseurl + "members/"+memberId+"/votes.json",
      headers: {"X-API-Key": propublicaKey}})
      .done(response => {
        var votes = response["results"][0]["votes"]
        var voteList = ""
        votes.forEach((vote)=>{
          voteList += `<li>${vote.position}-${vote.description}</li>`
        })
        console.log(voteList);
        $("#votes").html(voteList)
      })
    })
}

class Representative {
  constructor(name, chamber) {
    this.name = name
    this.chamber = chamber
  }

  findMemberId() {
    this.memberId = allReps[this.name]
    console.log(this.name, this.memberId)
    return this.memberId
  }
}
