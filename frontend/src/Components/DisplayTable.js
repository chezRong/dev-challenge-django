import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DisplayTable extends Component {

	render() {
        const { data } = this.props;
        
		return (
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Total Deposited</th>
                        <th>Interest Amount Applied</th>
                        <th>Total Interest Amount</th>
                        <th>Total Savings</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(month =>
                        <tr key={`table-month-${month.month}`}>
                            <td>{month.month}</td>
                            <td>£{month.totalDeposit}</td>
                            <td>£{month.interestAmount}</td>
                            <td>£{month.totalInterest}</td>
                            <td>£{month.amount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
		);
	}
}

DisplayTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};
