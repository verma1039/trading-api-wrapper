from fastapi import APIRouter, HTTPException
from app.models import OrderRequest
from app.database import orders, trades, portfolio
import uuid

router = APIRouter()

@router.post("/api/v1/orders")
def place_order(order: OrderRequest):
    if order.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be > 0")

    if order.orderStyle == "LIMIT" and order.price is None:
        raise HTTPException(status_code=400, detail="Price required for LIMIT order")

    order_id = str(uuid.uuid4())

    status = "EXECUTED" if order.orderStyle == "MARKET" else "PLACED"

    orders[order_id] = {
        "orderId": order_id,
        "symbol": order.symbol,
        "quantity": order.quantity,
        "orderType": order.orderType,
        "status": status,
        "price": order.price
    }

    # Execute MARKET order immediately
    if status == "EXECUTED":
        trades.append({
            "tradeId": str(uuid.uuid4()),
            "symbol": order.symbol,
            "quantity": order.quantity,
            "price": order.price or 0
        })

        holding = portfolio.get(order.symbol, {"quantity": 0, "averagePrice": 0})
        holding["quantity"] += order.quantity
        portfolio[order.symbol] = holding

    return {"orderId": order_id, "status": status}


@router.get("/api/v1/orders/{orderId}")
def get_order_status(orderId: str):
    if orderId not in orders:
        raise HTTPException(status_code=404, detail="Order not found")
    return orders[orderId]
