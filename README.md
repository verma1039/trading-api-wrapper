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

`python -m venv venv`
`venv\Scripts\activate`
`pip install -r requirements.txt`

`python -m uvicorn app.main:app --reload`

## Server Runs at

`http://127.0.0.1:8000`

## API Endpoints

- `GET /api/v1/instruments`

- `POST /api/v1/orders`

- `GET /api/v1/orders/{orderId}`

- `GET /api/v1/trades`

- `GET /api/v1/portfolio`

## Sample Order Request

`{
  "symbol": "TCS",
  "orderType": "BUY",
  "orderStyle": "MARKET",
  "quantity": 5
}`

## SDK Wrapper

A Python SDK (sdk/trading_client.py) wraps the REST APIs for programmatic usage.

`from sdk.trading_client import TradingClient`
`client = TradingClient()`
`client.get_instruments()`

## Assumptions

- Single mocked user

- Market orders execute immediately

- Limit orders remain in PLACED state

- In-memory data resets on restart

## Execution Flow

Postman / SDK → FastAPI Backend
