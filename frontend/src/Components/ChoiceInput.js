import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ChoiceInput extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: props.defaultValue
		}
	}

	handleChange(e) {
		const value = parseFloat(e.currentTarget.value)
		this.setState({value})
        this.props.update(value)
	}

	render() {
		const { defaultValue } = this.props
		const { value } = this.state

		return (
			<div className={`frequency-input ${defaultValue !== undefined ? 'default-value' : ''}`}>
				{this.props.options.map(o => 
					<span key={`${this.props.id}-option-${o.name}`}>
						<input type='radio'
							name={o.name}
							value={o.value}
							checked={value === o.value}
							onChange={this.handleChange.bind(this)}/>{o.label}
					</span>					
				)}
			</div>
		)
	}
}

ChoiceInput.propTypes = {
	id: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			label: PropTypes.string,
			value: PropTypes.number,
		})),
	defaultValue: PropTypes.number,
	update: PropTypes.func
}
