"""
Interest Calculator functions.
"""

def calculate_payout(initial, monthly_deposit, interest_rate, frequency, duration):
    """
    Calculates the monthly balance of a savings account given the initial
    amount, the monthly deposit, the interest rate and the duration in
    years
    """
    # Interest with frequency taken into account
    interest = (interest_rate / 100) / frequency
    
    # Apply interest every n months
    interest_frequency = 12 / frequency

    # Number of months to calculate
    duration_in_months = duration * 12

    # Rolling Total
    rolling = initial

    # Average for current period
    average = 0

    # Total deposit
    total_deposit = 0

    # Local interest and total interest
    local_interest = 0
    total_interest = 0

    # Result list
    result = []

    for month in range(1, duration_in_months + 1):
        total_deposit += monthly_deposit
        rolling += monthly_deposit
        average += rolling

        if month % interest_frequency == 0:
            # Take average over period rather than end value.
            local_interest = (average / interest_frequency) * interest
            total_interest += local_interest
            rolling += local_interest
            average = 0

        result.append({
            'month': month,
            'amount': round(rolling, 2),
            'interestAmount': round(local_interest, 2),
            'totalDeposit': round(total_deposit, 2),
            'totalInterest': round(total_interest, 2) 
        })

    return result
