"""
Interest Calculator functions.

TODO:
    - Write basic interest calculator w/ monthly interest
    - Write more advanced calculator w/ optional interest payout rate
    - Output a detailed report of month by month savings
"""

def calculate_payout(initial, monthly_deposit, interest_rate, duration):
    """
    Calculates the monthly balance of a savings account given the initial
    amount, the monthly deposit, the interest rate and the duration in
    years
    """
    interest = (interest_rate / 100) / 12  # Assuming Monthly Interest
    duration_in_months = duration * 12
    rolling = initial

    for month in range(1, duration_in_months + 1):
        rolling += monthly_deposit
        rolling += (rolling * interest)

    return round(rolling, 2)
