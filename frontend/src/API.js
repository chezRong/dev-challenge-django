import request from "axios"

export const calculate = (initial, savingsAmount, interestRate) => {
	return request
		.post("/calculate/", {
			initial,
			savingsAmount,
			interestRate
		})
}
