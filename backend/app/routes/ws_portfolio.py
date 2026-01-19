from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio

from app.database import wallet, holdings
from app.services.market_data import get_live_price

router = APIRouter()

@router.websocket("/ws/portfolio")
async def portfolio_stream(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            total_invested = 0.0
            total_current_value = 0.0
            portfolio_holdings = []

            for symbol, h in holdings.items():
                qty = h["quantity"]
                avg_price = h["avgPrice"]
                live_price = get_live_price(symbol)

                invested = qty * avg_price
                current = qty * live_price
                unrealized = current - invested

                total_invested += invested
                total_current_value += current

                portfolio_holdings.append({
                    "symbol": symbol,
                    "quantity": qty,
                    "avgPrice": round(avg_price, 2),
                    "livePrice": round(live_price, 2),
                    "investedValue": round(invested, 2),
                    "currentValue": round(current, 2),
                    "unrealizedPnL": round(unrealized, 2),
                })

            payload = {
                "balance": round(wallet["balance"], 2),
                "totalInvested": round(total_invested, 2),
                "totalCurrentValue": round(total_current_value, 2),
                "totalUnrealizedPnL": round(total_current_value - total_invested, 2),
                "holdings": portfolio_holdings
            }

            await websocket.send_json(payload)
            await asyncio.sleep(2)

    except WebSocketDisconnect:
        pass
