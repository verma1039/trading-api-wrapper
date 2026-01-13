import yfinance as yf
from app.database import instruments

_price_cache = {}


def get_live_price(symbol: str) -> float:
    symbol = symbol.upper()

    try:
        ticker = yf.Ticker(symbol)

        # Most reliable fields (fallback chain)
        price = (
            ticker.fast_info.get("last_price")
            or ticker.info.get("regularMarketPrice")
            or ticker.info.get("currentPrice")
        )

        if price is None:
            return _price_cache.get(symbol, 0.0)

        price = float(price)

        # update instrument reference
        for inst in instruments:
            if inst["symbol"] == symbol:
                inst["lastTradedPrice"] = round(price, 2)
                break

        _price_cache[symbol] = price
        return price

    except Exception:
        return _price_cache.get(symbol, 0.0)
