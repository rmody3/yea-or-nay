
class billApi {
  static get(id){
    return $.ajax({
        url: propublica + "members/" + id + "/votes.json",
      headers: {"X-API-Key": propublicaKey}})
  }
}
