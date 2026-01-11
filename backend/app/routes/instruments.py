from fastapi import APIRouter, Query
from app.database import instruments
from app.services.market_data import get_live_price

router = APIRouter()

@router.get("/api/v1/instruments")
def get_instruments(
    q: str | None = None,
    page: int = 1,
    limit: int = 10
):
    data = instruments

    if q:
        data = [i for i in data if q.lower() in i["symbol"].lower()]

    start = (page - 1) * limit
    end = start + limit
    page_items = data[start:end]

    result = []
    for i in page_items:
        item = i.copy()
        item["lastTradedPrice"] = get_live_price(item["symbol"])
        result.append(item)

    return {
        "total": len(data),
        "page": page,
        "limit": limit,
        "items": result
    }
