class OfficialView{

  static renderOfficials($target, officials){
    let header = "<tr><th>Your Representatives</th></tr>"
    let officialTable = officials.map(this.eachOfficialTemplate)
    $("#detail-container").empty()
    $("#user-vote").empty()
    $target.html(header + officialTable)
  }

  static eachOfficialTemplate(official){
    return `<tr><td>
            <a href="#" class="rep-link" data-id= "${official.memberId}">${official.name} of the ${official.chamber}</a>
            </td></tr>`
  }
}
