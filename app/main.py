from fastapi import FastAPI
from app.routes import instruments, orders, trades, portfolio

app = FastAPI()

app.include_router(instruments.router)
app.include_router(orders.router)
app.include_router(trades.router)
app.include_router(portfolio.router)