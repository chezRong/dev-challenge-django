import React, { Component } from "react"
import { calculate } from "./API"
import InputGraphSection from './Components/InputGraphSection'
import "./App.css"
import { debounce } from 'lodash'


class App extends Component {
	state = {
		loading: false,
		params: {
			initial: 0.0,
			savingsAmount: 0.0,
			interestRate: 0.0,
			frequency: 12,
		},
		result: null,
		view: 0 // Graph = 0, Table = 1
	}

	recalculate = (key) => {
		return debounce(value => {
			const updatedParams = { ...this.state.params, [key]: value }
			calculate(
				updatedParams.initial,
				updatedParams.savingsAmount,
				updatedParams.interestRate,
				updatedParams.frequency,
			).then(r => this.setState({
				params: updatedParams,
				result: r.data.result,
			}))
		}, 250)
	}

	updateView = (view) => {
		this.setState({ view })
	}

	render() {
	    const {loading} = this.state

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Finimize dev challenge</h1>
				</header>
                    {loading ?
                        'Loading...'
                    :
						<InputGraphSection
							{...this.state.params}
							result={this.state.result}
							view={this.state.view}
							updateView={this.updateView}
							recalculate={this.recalculate}
						/>
                    }
			</div>
		)
	}
}

export default App
