from fastapi import APIRouter, HTTPException
from datetime import datetime

from app.database import wallet, holdings, trades
from app.services.market_data import get_live_price

router = APIRouter()

@router.post("/api/v1/orders")
def place_order(order: dict):
    symbol = order.get("symbol")
    side = order.get("side")
    quantity = order.get("quantity")

    if not symbol or side not in ["BUY", "SELL"] or not quantity or quantity <= 0:
        raise HTTPException(status_code=400, detail="Invalid order")

    price = get_live_price(symbol)
    if price <= 0:
        raise HTTPException(status_code=400, detail="Price unavailable")

    timestamp = datetime.utcnow().isoformat()

    if side == "BUY":
        total_cost = price * quantity
        if wallet["balance"] < total_cost:
            raise HTTPException(status_code=400, detail="Insufficient balance")

        wallet["balance"] -= total_cost

        if symbol in holdings:
            old_qty = holdings[symbol]["quantity"]
            old_avg = holdings[symbol]["avgPrice"]
            new_qty = old_qty + quantity
            new_avg = ((old_qty * old_avg) + (quantity * price)) / new_qty
            holdings[symbol]["quantity"] = new_qty
            holdings[symbol]["avgPrice"] = new_avg
        else:
            holdings[symbol] = {
                "quantity": quantity,
                "avgPrice": price
            }

    if side == "SELL":
        if symbol not in holdings or holdings[symbol]["quantity"] < quantity:
            raise HTTPException(status_code=400, detail="Insufficient holdings")

        wallet["balance"] += price * quantity
        holdings[symbol]["quantity"] -= quantity

        if holdings[symbol]["quantity"] == 0:
            del holdings[symbol]

    trade = {
        "tradeId": len(trades) + 1,
        "symbol": symbol,
        "side": side,
        "quantity": quantity,
        "price": price,
        "timestamp": timestamp
    }

    trades.append(trade)

    return {
        "status": "EXECUTED",
        "trade": trade,
        "balance": wallet["balance"]
    }
