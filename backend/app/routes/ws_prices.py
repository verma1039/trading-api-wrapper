from fastapi import APIRouter, WebSocket
import asyncio

router = APIRouter()

@router.websocket("/ws/prices")
async def prices_ws(websocket: WebSocket):
    await websocket.accept()
    while True:
        await websocket.send_json({"status": "alive"})
        await asyncio.sleep(2)
