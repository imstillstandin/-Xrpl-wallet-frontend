const fetchPortfolio = async () => {
  setLoading(true);
  console.log("Fetching for wallet:", wallet);
  console.log("Using API base:", import.meta.env.VITE_API_BASE_URL);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wallet/${wallet}`);
    const data = await res.json();
    console.log("Received data:", data);
    setPortfolio(data);
  } catch (err) {
    console.error('Failed to fetch portfolio:', err);
    setPortfolio(null);
  } finally {
    setLoading(false);
  }
};

import { useState } from 'react';

function App() {
  const [wallet, setWallet] = useState('');
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wallet/${wallet}`);
      const data = await res.json();
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>XRPL Portfolio Tracker</h1>

      <input
        type="text"
        placeholder="Enter XRPL wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ padding: 8, width: '80%' }}
      />
      <button onClick={fetchPortfolio} style={{ marginLeft: 10, padding: 8 }}>
        Fetch
      </button>

      {loading && <p>Loading...</p>}

      {portfolio && (
        <div style={{ marginTop: 24 }}>
          <h2>Address: {portfolio.address}</h2>
          <ul>
            {portfolio.tokens.map((token, index) => (
              <li key={index}>
                {token.currency}: {token.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
