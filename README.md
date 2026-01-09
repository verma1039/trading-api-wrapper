# Trading API Wrapper – Bajaj Broking Assignment

## Overview
A simplified trading backend built with FastAPI that simulates core workflows of an online stock broking platform.  
It exposes REST APIs for instruments, orders, trades, and portfolio, along with a lightweight Python SDK wrapper.

No real market connectivity is used.

## Tech Stack
- Python (FastAPI)
- JSON APIs
- In-memory storage
- Python SDK using `requests`

## Setup & Run

git clone https://github.com/verma1039/trading-api-wrapper.git

cd trading-api-wrapper


python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload

 ## Server runs at:

http://127.0.0.1:8000

## Using Swagger UI (Primary Testing Tool)

FastAPI automatically provides Swagger UI for interactive API testing.

### Open Swagger UI

http://127.0.0.1:8000/docs

All available APIs are listed here and can be executed directly from the browser.

## API Usage via Swagger UI

1. Get Instruments
GET /api/v1/instruments
Click Try it out → Execute

2. Place Order
POST /api/v1/orders
Click Try it out
Replace the auto-generated schema with:

{
  "symbol": "TCS",
  
  "orderType": "BUY",
  
  "orderStyle": "MARKET",
  
  "quantity": 10
}

Click Execute

MARKET orders are executed immediately.

3. Get Order Status

GET /api/v1/orders/{orderId}

Paste the orderId returned from the order placement response.

5. Get Trades

GET /api/v1/trades

Displays all executed trades in the current session.

7. Get Portfolio

GET /api/v1/portfolio

Displays current portfolio holdings based on executed buy orders.

## SDK Wrapper
A Python SDK (sdk/trading_client.py) wraps the same REST APIs for programmatic usage.

from sdk.trading_client import TradingClient

client = TradingClient()

client.get_instruments()

The SDK and Swagger UI both communicate with the same backend server.

## Assumptions

1. Single mocked user
2. Market orders execute immediately
3. Limit orders remain in PLACED state
4. In-memory data resets on server restart

## Execution Flow

Swagger UI / SDK → FastAPI Backend

## Conclusion
This project demonstrates REST API design, basic trading workflows, and a wrapper SDK as required by the assignment.

Swagger UI is used as the primary interface for API exploration and testing.
