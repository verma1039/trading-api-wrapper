from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio

from app.services.market_data import get_live_price
from app.database import instruments
from app.services.portfolio_snapshot import build_portfolio_snapshot

router = APIRouter()

@router.websocket("/ws/prices")
async def price_stream(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            prices = []

            for inst in instruments:
                symbol = inst["symbol"]
                price = get_live_price(symbol)

                prices.append({
                    "symbol": symbol,
                    "price": round(price, 2)
                })

            await websocket.send_json(prices)
            await asyncio.sleep(2)  # push every 2 seconds

    except WebSocketDisconnect:
        pass

@router.websocket("/ws/portfolio")
async def portfolio_stream(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            snapshot = build_portfolio_snapshot()
            await websocket.send_json(snapshot)
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass

