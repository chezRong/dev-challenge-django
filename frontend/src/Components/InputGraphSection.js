import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import DisplayGraph from "./DisplayGraph"
import "./InputGraphSection.css"

export default class InputGraphSection extends Component {
  render() {
    return (
      <div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput defaultValue={this.props.initial} update={this.props.recalculate('initial')}/>

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput defaultValue={this.props.savingsAmount} update={this.props.recalculate('savingsAmount')}/>

          <p className="input-label">
            How much interest will you earn per year?
          </p>
          <SliderInput defaultValue={this.props.interestRate} update={this.props.recalculate('interestRate')}/>
        </div>
        <div className="financial-display">
          { this.props.result ? <DisplayGraph data={this.props.result}/> : '' }
        </div>
      </div>
    )
  }
}
