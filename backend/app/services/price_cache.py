import time
from typing import Dict
from app.services.market_data import get_live_price

# symbol -> {"price": float, "timestamp": float}
_price_cache: Dict[str, dict] = {}

# seconds
PRICE_TTL = 5


def get_price(symbol: str) -> float:
    symbol = symbol.upper()
    now = time.time()

    cached = _price_cache.get(symbol)

    # return cached if fresh
    if cached and (now - cached["timestamp"] < PRICE_TTL):
        return cached["price"]

    # fetch fresh
    price = get_live_price(symbol)
    if price > 0:
        _price_cache[symbol] = {
            "price": price,
            "timestamp": now
        }
        return price

    # fallback
    return cached["price"] if cached else 0.0


def get_all_prices(symbols: list[str]) -> Dict[str, float]:
    return {s: get_price(s) for s in symbols}
