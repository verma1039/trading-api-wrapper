import Instruments from "./pages/Instruments";
import PlaceOrder from "./pages/PlaceOrder";
import Portfolio from "./pages/Portfolio";
import Trades from "./pages/Trades";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Trading Platform</h1>
      <Instruments />
      <PlaceOrder />
      <Portfolio />
      <Trades />
    </div>
  );
}

export default App;
