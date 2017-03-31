class OfficialApi {
  static get(chamber){
    return $.ajax({
      url: propublica + "115/" + chamber + "/members.json",
      headers: {"X-API-Key": propublicaKey}})
  }
}
