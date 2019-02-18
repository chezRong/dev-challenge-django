from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from interest_calculator import calculator
import json

@require_POST
@csrf_exempt
def calculate(request):
    params = json.loads(request.body)
    req_params = ["initial", "savingsAmount", "interestRate"]
    req_params_mapped = {k: params.get(k, None) for k in req_params}

    # Check Params provided
    if None in req_params_mapped.values():
        return HttpResponseBadRequest(f"Required parameters not provided")

    # Check Params are float or castable to float
    try:
        req_params_casted = {k: float(v) for k, v in req_params_mapped.items()}
    except ValueError:
        return HttpResponseBadRequest("Required parameters must be numbers")

    # Check Params are non negative
    if any(v < 0 for v in req_params_casted.values()):
        return HttpResponseBadRequest("Required parameters must be non-negative")

    result = calculator.calculate_payout(
        initial=req_params_casted["initial"],
        monthly_deposit=req_params_casted["savingsAmount"],
        interest_rate=req_params_casted["interestRate"],
        duration=50
    )

    return JsonResponse({'result': result})
