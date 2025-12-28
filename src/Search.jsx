import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoginContex } from "./Context"; // Connects to your Context.jsx
import Header from "./Header"; // Added Header import
import "./styles.css";

export default function Search() { // Capitalized S
  const [click, setClick] = useState(false);
  const { fvalue, setValue } = useContext(LoginContex); // Using shared context
  const [dt, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (click && fvalue) {
      async function searching() {
        setLoading(true);
        // Using fvalue (the UUID) in the URL
        const url = `https://coinranking1.p.rapidapi.com/coin/${fvalue}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY, // Corrected: No quotes
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          
          if (result.data && result.data.coin) {
            setData(result.data.coin);
          } else {
            alert("Coin not found. Please check the UUID.");
          }
        } catch (error) {
          console.error("Search error:", error);
          alert("Error fetching coin details.");
        } finally {
          setLoading(false);
          setClick(false);
        }
      }
      searching();
    }
  }, [click]);

  return (
    <div className="searching">
      <Header />

      <div className="search-container">
        <h3>Search for a Specific Coin</h3>
        <p className="hint">Tip: Use a UUID like "QwsjZlV2apCw" (Bitcoin)</p>
        
        <div className="input-group">
          <input
            className="inputing"
            type="text"
            value={fvalue}
            placeholder="Paste coin UUID here..."
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <button 
            disabled={loading} 
            onClick={() => setClick(true)}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="navigation-links">
          <Link to="/">
            <button className="secondary-btn">Back to Home</button>
          </Link>
        </div>
      </div>

      <div className="details">
        {dt ? (
          <div className="details1">
             <div className="details-header">
                <img className="coin-logo" src={dt.iconUrl} alt={dt.name} />
                <h2>{dt.name} ({dt.symbol})</h2>
             </div>
             <hr />
             <div className="details-body">
                <p><strong>Price:</strong> ${parseFloat(dt.price).toLocaleString()}</p>
                <p><strong>Rank:</strong> #{dt.rank}</p>
                <p><strong>Market Cap:</strong> ${parseFloat(dt.marketCap).toLocaleString()}</p>
                <p><strong>Exchanges:</strong> {dt.numberOfExchanges}</p>
                <p><strong>Website:</strong> <a href={dt.websiteUrl} target="_blank" rel="noreferrer">Visit Site</a></p>
                <p className="description"><strong>Description:</strong> {dt.description}</p>
             </div>
          </div>
        ) : (
          !loading && <p className="empty-msg">No coin selected. Enter a UUID and click Search.</p>
        )}
      </div>
    </div>
  );
}
