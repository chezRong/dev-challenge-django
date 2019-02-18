import request from "axios"

export const calculate = (initial, savingsAmount, interestRate, frequency) => {
	return request
		.post("/calculate/", {
			initial,
			savingsAmount,
			interestRate,
			frequency
		})
}
