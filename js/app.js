

$(function () {
  Official.getChamberOfficials("house")//gets entire list of reps from current congress
  Official.getChamberOfficials("senate")//gets entire list of reps from current congres
  $("#address-search").on("submit", function(event) {
    $("#votes").empty()
    event.preventDefault()
    var address = $('#address').val()
    Official.byAddress(address).then(officials=>{
      let $target = $("#officials-table")
      let $detailTarget = $("#detail-container")
      var billDetailController = new BillDetailController($detailTarget)
      var billController = new BillController($detailTarget, billDetailController)
      var officialController = new OfficialController($target, officials, billController)
    })
  })
})
