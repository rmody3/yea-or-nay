const baseurl = "https://api.propublica.org/congress/v1/"
const propublicaKey = "xmCA1Av1H07lpXRoKF6kjhjup7QgGNu8bTnUfmlc"
const googleKey = "AIzaSyBEC89A8IPwzvsY9XGI1RFXJSyubOURnaY"
const google = `https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=${googleKey}&address=`

var allReps = {}
var yourReps = []


$(function () {
  getRepList("house")//gets entire list of reps from current congress
  getRepList("senate")//gets entire list of senators from current congress
  $("#address-search").on("submit", function(event) {
    yourReps = []
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
  constructor(name) {
    this.name = name
  }

  findMemberId() {
    this.memberId = allReps[this.name]
    console.log(this.name, this.memberId)
    return this.memberId
  }
}
