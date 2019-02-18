import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import DisplayGraph from "./DisplayGraph"
import ChoiceInput from "./ChoiceInput"
import DisplayTable from "./DisplayTable"
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
        
          <p className="input-label">
            How often is interest paid?
          </p>
          <ChoiceInput
            options={[
              { name: 'monthly', value: 12, label: 'Monthly'},
              { name: 'quarterly', value: 4, label: 'Quarterly'},
              { name: 'yearly', value: 1, label: 'Yearly'},
            ]}
            defaultValue={this.props.frequency}
            update={this.props.recalculate('frequency')}
          />

          <p className="input-label">
            How do you want your data displayed?
          </p>
          <ChoiceInput
            options={[
              { name: 'graph', value: 0, label: 'Graph'},
              { name: 'table', value: 1, label: 'Table'},
            ]}
            defaultValue={this.props.view}
            update={this.props.updateView}
          />
        </div>
        <div className="financial-display">
            { this.props.result ?
                this.props.view === 0 ?
                  <DisplayGraph data={this.props.result}/> :
                  <DisplayTable data={this.props.result}/> :
                  ''
            }
        </div>
      </div>
    )
  }
}
