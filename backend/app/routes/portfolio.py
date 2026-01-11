from fastapi import APIRouter
from app.database import wallet, holdings

router = APIRouter()

@router.get("/api/v1/portfolio")
def get_portfolio():
    return {
        "balance": wallet["balance"],
        "holdings": holdings
    }
