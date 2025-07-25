import { useState } from "react";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState("");
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPortfolio = async () => {
    setLoading(true);
    setError("");
    setPortfolio(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wallet/${wallet}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setPortfolio(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch wallet data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>XRPL Wallet Tracker</h1>

      <input
        type="text"
        placeholder="Enter XRPL wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", fontSize: "1rem" }}
      />
      <button onClick={fetchPortfolio} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
        Fetch
      </button>

      {loading && <p style={{ marginTop: "1rem" }}>Loading...</p>}
      {error && <p style={{ marginTop: "1rem", color: "red" }}>{error}</p>}

      {portfolio && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Wallet: {portfolio.address}</h2>
          <h3>Tokens:</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.tokens.map((token, idx) => (
                <tr key={idx}>
                  <td>{token.currency}</td>
                  <td>{parseFloat(token.value).toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

