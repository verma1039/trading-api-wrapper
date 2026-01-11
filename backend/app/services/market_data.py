import os
import requests

API_KEY = os.getenv("ALPHAVANTAGE_API_KEY")
BASE_URL = "https://www.alphavantage.co/query"

def get_live_price(symbol: str) -> float:
    if not API_KEY:
        return 0.0

    params = {
        "function": "GLOBAL_QUOTE",
        "symbol": symbol,
        "apikey": API_KEY
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=5)
        data = response.json()
        return float(data["Global Quote"]["05. price"])
    except Exception:
        return 0.0
