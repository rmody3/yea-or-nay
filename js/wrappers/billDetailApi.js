const propublica = "https://api.propublica.org/congress/v1/"
const propublicaKey = "xmCA1Av1H07lpXRoKF6kjhjup7QgGNu8bTnUfmlc"

class billDetailApi {
  static get(billObject){
    return $.ajax({
        url: billObject.bill.bill_uri,
      headers: {"X-API-Key": propublicaKey}})
  }
}
