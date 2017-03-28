const baseurl = "https://api.propublica.org/congress/v1/"

const google = `https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=${googleKey}&address=`
var allReps = {}

// function convertAddress(address){
//   return address.replace(" ", "%20")
// }

$(function () {
  getRepList("house")
  getRepList("senate")
  $("#address-search").on("submit", function(event) {
    event.preventDefault()
    var address = $('#address').val()
    $.get(google + address, (result)=> {
      var reps = result["officials"]
      var repTable = "<tr><th>Your Representatives</th></tr>"
      repTable += `<tr><td><a href="#" data-id= "rep-link"> Senate: ${reps[0].name} </a></td></tr>`
      repTable += `<tr><td><a href="#" class= "rep-link"> Senate: ${reps[1].name}</a></td></tr>`
      repTable += `<tr><td><a href="#" class= "rep-link"> Congress: ${reps[2].name}</a></td></tr>`
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
      console.log(allReps)
    })
}

function addRepLinks(){
  $(".rep-link").on('click', function () {
    this.dat
  })
}


// class Representative {
//   constructor(chamber, firstName, lastName) {
//     this.chamber = chamber
//     this.firstName = firstName
//     this.lastName = lastName
//   }
//
//   function findMemberID() {
//     $.get()
//     return
//   }
// }


//
// var address = $('#address').val()
// // console.log(address)
// //
// $.ajax({
//   url: baseurl + "members/K000388/votes.json",
//   headers: {"X-API-Key": ""}})
  // .done(response =>
  //   {$('body').text(response["results"][0]["votes"][0].position)
  //   console.log(response["results"][0]["votes"][0])
  //   })
