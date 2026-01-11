from fastapi import FastAPI
from app.routes import instruments, orders, trades, portfolio, ws_prices

app = FastAPI()

app.include_router(instruments.router)
app.include_router(orders.router)
app.include_router(trades.router)
app.include_router(portfolio.router)

# THIS LINE MUST EXIST
app.include_router(ws_prices.router)
