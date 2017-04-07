import React, { Component } from 'react';
import AddressForm from './AddressForm'
import OfficialsTable from './OfficialsTable'
import './App.css';


class SideBar extends Component {
  constructor() {
    super()

  }
  render(){
    return (
      <div className= "sidebar">
        <div>
          <AddressForm getOfficials={this.props.getOfficials}/>
        </div>
        <div>
        <OfficialsTable getBills={this.props.getBills} yourReps={this.props.yourReps}
        />
        </div>
      </div>
  )}
}

export default SideBar
