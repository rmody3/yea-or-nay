class OfficialView{

  static renderOfficials($target, officials){
    let header = "<thead><tr><th>Your Representatives</th></tr><thead><tbody>"
    let officialTable = officials.map(this.eachOfficialTemplate)
    $("#detail-container").empty()
    $("#user-vote").empty()
    $target.html(header + officialTable + '</tbody>')
  }

  static eachOfficialTemplate(official){
    return `<tr><td>
            <a href="#" class="rep-link" data-id= "${official.memberId}">${official.name} of the ${official.chamber}</a>
            </td></tr>`
  }
}
