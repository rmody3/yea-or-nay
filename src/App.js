import React, { Component } from 'react';
import axios from 'axios'
import SideBar from './SideBar'
import DetailContainer from './DetailContainer'
import './App.css'
import Store from './store'

const googleKey = "AIzaSyBEC89A8IPwzvsY9XGI1RFXJSyubOURnaY"
const google = `https://www.googleapis.com/civicinfo/v2/representatives?roles=legislatorUpperBody&roles=legislatorLowerBody&levels=country&key=${googleKey}&address=`

const propublica = "https://api.propublica.org/congress/v1/"
const propublicaKey = "xmCA1Av1H07lpXRoKF6kjhjup7QgGNu8bTnUfmlc"

let store = new Store()
class App extends Component {
  constructor(){
    super()
    this.state ={
      yourReps: [],
      billList: {}
    }
    this.getOfficials = this.getOfficials.bind(this)
    this.getBills = this.getBills.bind(this)
  }

  getOfficials(address){
    axios
    .get(google + address)
    .then((result)=>{
      var reps = result["data"]["officials"]
      var yourReps = []
      reps.forEach((rep)=>{
        let splitName = rep.name.split(" ")
        let name = splitName[0] + " " + splitName[splitName.length - 1]
        yourReps.push(store.find("official",name))
      })
      this.setState({
        yourReps: yourReps
      })
    })
  }

  getOfficialIds(chamber){
     axios
     .get(propublica + "115/" + chamber + "/members.json",{
       headers: {"X-API-Key": propublicaKey}})
     .then(response=>{
      response["data"]["results"][0]["members"].forEach(member => {
        let name = member.first_name + " " + member.last_name
        let splitName = name.split(" ")
        name = splitName[0] + " " + splitName[splitName.length -1]
        let officialInfoObject = {"memberId": member.id, "name": name, "chamber": chamber }
        store.add("official", name, officialInfoObject)
      })
    })
  }

  getBills(id){
    axios
     .get(
        propublica + "members/" + id + "/votes.json",
       {headers: {"X-API-Key": propublicaKey}})
       .then(response=>{
         var bills = response["data"]["results"][0]["votes"]
          store.state.bill = {}
          bills.forEach((bill)=>{
            if(bill.question.match (/.*(Passage|Nomination|Suspend the Rules and Pass).*/)){
              store.add("bill", bill.description, bill)
            }
          })
          console.log(store.state['bill'])
          debugger
           this.setState({
             billList: store.state['bill']
           })
        })
  }

  componentDidMount(){
    this.getOfficialIds("senate")
    this.getOfficialIds("house")
  }

  render() {
    return (
      <div className="App">
        <div className="page-header">
          <h1>Yea or Nay <small>Do you agree with your Legislators?</small></h1>
        </div>
        <SideBar getBills={this.getBills} getOfficials={this.getOfficials} yourReps={this.state.yourReps}/>
        <DetailContainer billList={this.state.billList} />
      </div>
    );
  }
}

export default App;
