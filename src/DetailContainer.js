import React, { Component } from 'react';
import './App.css';

class DetailContainer extends Component {
  constructor() {
    super()
    this.eachBillTemplate = this.eachBillTemplate.bind(this)
  }

  renderBills(billsResult){
    return    Object.keys(billsResult).map(billKey=>{
      return  this.eachBillTemplate(billsResult[billKey])
    })
  }

   eachBillTemplate(bill){
    return <a href="#" className="bill-link list-group-item" data-id={bill.description}><strong>{bill.date}</strong> - {bill.description}</a>
  }


  render(){
    return (
      <div id="detail-container" className ="list-group">
        {this.renderBills(this.props.billList)}
      </div>

  )}
}

export default DetailContainer
