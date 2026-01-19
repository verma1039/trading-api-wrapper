import useLivePortfolio from "../hooks/useLivePortfolio";

export default function Portfolio() {
  const portfolio = useLivePortfolio();

  if (!portfolio) {
    return <p>Loading portfolio...</p>;
  }

  const {
    balance = 0,
    totalInvested = 0,
    totalCurrentValue = 0,
    totalUnrealizedPnL = 0,
    holdings = [],
  } = portfolio;

  return (
    <div>
      <h2>Portfolio</h2>

      <p>Balance: {balance.toFixed(2)}</p>
      <p>Total Invested: {totalInvested.toFixed(2)}</p>
      <p>Current Value: {totalCurrentValue.toFixed(2)}</p>
      <p>Unrealized PnL: {totalUnrealizedPnL.toFixed(2)}</p>

      {holdings.length === 0 ? (
        <p>No holdings yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>Live Price</th>
              <th>Unrealized PnL</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map(h => (
              <tr key={h.symbol}>
                <td>{h.symbol}</td>
                <td>{h.quantity}</td>
                <td>{Number(h.avgPrice).toFixed(2)}</td>
                <td>{Number(h.livePrice).toFixed(2)}</td>
                <td>{Number(h.unrealizedPnL).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
