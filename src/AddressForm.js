import React, { Component } from 'react';
import './App.css';

class AddressForm extends Component {
  constructor() {
    super()


    this.state = {
      address: ""
    }
    this.handleGetOfficialsSubmit = this.handleGetOfficialsSubmit.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)

  }

  handleGetOfficialsSubmit(event){
    event.preventDefault()
    this.props.getOfficials(this.state.address)
  }

  handleAddressChange(event){
    this.setState({
      address: event.target.value
    })
  }

  render(){
    return (
      <form className="form-inline" id="address-search" onSubmit={this.handleGetOfficialsSubmit}>
        <div className="form-group">
          <label htmlFor="address">Enter your address or ZIP code: </label>
          <input type="text" className="form-control" name="address"  id="address" value={this.state.address} onChange={this.handleAddressChange} />
          <input type="submit" className="form-control" value="Submit" />
        </div>
      </form>
  )}
}


export default AddressForm
