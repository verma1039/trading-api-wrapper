from fastapi import APIRouter
from app.database import portfolio

router = APIRouter()

@router.get("/api/v1/portfolio")
def get_portfolio():
    response = []
    for symbol, data in portfolio.items():
        response.append({
            "symbol": symbol,
            "quantity": data["quantity"],
            "averagePrice": data["averagePrice"],
            "currentValue": data["quantity"] * data["averagePrice"]
        })
    return response
