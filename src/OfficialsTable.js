import React, { Component } from 'react';
import './App.css';

class OfficialsTable extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.eachOfficialTemplate = this.eachOfficialTemplate.bind(this)
  }

  renderOfficials(officials){
    return officials.map(this.eachOfficialTemplate)
  }

  eachOfficialTemplate(official){
    return (<tr><td>
            <a href="#" onClick={this.handleClick} className="rep-link" data-id= {official.memberId}>{official.name} of the {official.chamber}</a>
            </td></tr>)
  }

  handleClick(event){
    event.preventDefault()
    this.props.getBills(event.target.dataset.id)

  }


  render(){
    return (
      <div>
        <table className="table table-hover table-bordered" id="officials-table">
          <thead><tr><th>Your Representatives</th></tr></thead>
          <tbody>
            {this.renderOfficials(this.props.yourReps)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default OfficialsTable
