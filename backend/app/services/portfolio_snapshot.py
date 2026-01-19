from app.database import holdings
from app.services.market_data import get_live_price

def build_portfolio_snapshot():
    total_invested = 0.0
    total_current = 0.0
    items = []

    for symbol, h in holdings.items():
        qty = h["quantity"]
        avg = h["avgPrice"]
        live = get_live_price(symbol)

        invested = qty * avg
        current = qty * live
        pnl = current - invested

        total_invested += invested
        total_current += current

        items.append({
            "symbol": symbol,
            "quantity": qty,
            "avgPrice": round(avg, 2),
            "livePrice": round(live, 2),
            "investedValue": round(invested, 2),
            "currentValue": round(current, 2),
            "unrealizedPnL": round(pnl, 2),
        })

    return {
        "totalInvested": round(total_invested, 2),
        "totalCurrentValue": round(total_current, 2),
        "totalUnrealizedPnL": round(total_current - total_invested, 2),
        "holdings": items,
    }
