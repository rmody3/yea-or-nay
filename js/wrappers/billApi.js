const propublica = "https://api.propublica.org/congress/v1/"
const propublicaKey = "xmCA1Av1H07lpXRoKF6kjhjup7QgGNu8bTnUfmlc"

class billApi {
  static get(id){
    return $.ajax({
        url: propublica + "members/" + id + "/votes.json",
      headers: {"X-API-Key": propublicaKey}})
  }
}
