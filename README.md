Trading Simulator (Personal Exploration Project)

This project is a personal stock trading simulator built to explore how real-world trading platforms work from a systems and engineering perspective.

The focus is on:

real-time market data flow

order execution logic

portfolio accounting

frontend–backend communication using REST and WebSockets

No real money is involved.

What this project does (current state)
Real-time price streaming (infrastructure ready)

Backend exposes a WebSocket endpoint:

ws://localhost:8000/ws/prices


Frontend subscribes once and receives live updates

Prices update continuously without polling

Market data source is currently placeholder/test-based

Real market data integration is planned next

Tradable instruments

Backend maintains a list of tradable stocks (symbol, exchange, type)

Instruments are fetched via REST:

GET /api/v1/instruments


Frontend displays all available instruments

Virtual order placement

Supports:

BUY orders

SELL orders

Orders are placed via REST:

POST /api/v1/orders


Orders execute immediately using the current market price logic

No real funds are used

Trades tracking

Every executed order creates a trade

Trades are stored in backend memory

Trade history is available via:

GET /api/v1/trades

Portfolio state

Backend maintains a virtual portfolio

Tracks holdings per symbol

Portfolio updates automatically after trades

Portfolio data available via:

GET /api/v1/portfolio

Frontend application

Built using React + Vite

Features:

Instrument list

Live price updates

Buy / Sell interface

Portfolio view

Trades history

Uses:

REST APIs for state-changing operations

WebSockets for real-time price updates

What this project is NOT (by design)

Not a real trading platform

No real money involved

No authentication or user accounts

No multi-user support

No order book or matching engine

No persistence (state is in-memory only)

These exclusions are intentional to keep the focus on learning and exploration.

Tech stack
Backend

Python

FastAPI

Uvicorn

WebSockets

In-memory data storage

Frontend

React

Vite

Axios

Native WebSocket API

Project structure (simplified)
backend/
 └── app/
     ├── routes/        # REST & WebSocket endpoints
     ├── services/      # Market data abstraction
     ├── database.py    # In-memory state
     └── main.py

frontend/
 └── src/
     ├── api/           # REST clients
     ├── hooks/         # WebSocket logic
     ├── pages/         # UI screens
     └── App.jsx

How to run locally
Backend
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app


Backend runs at:

http://localhost:8000

Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

Planned next steps

Integrate real stock prices (Yahoo Finance)

Add virtual cash balance

Enforce balance checks on BUY / SELL

Portfolio PnL (realised & unrealised)

Persistence using SQLite

Market hours simulation

Motivation

This project is built for personal learning and exploration.

The goal is to understand:

how trading platforms behave

how real-time systems are designed

how prices, orders, trades, and portfolios interact over time

It is intentionally kept simple and extensible.
