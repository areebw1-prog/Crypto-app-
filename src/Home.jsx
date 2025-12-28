import { useContext, useEffect, useState } from "react";
import { LoginContex } from "./Context";
import { Link } from "react-router-dom";
import Header from "./Header"; // Added Header import
import "./styles.css";

export default function Home() {
  const { fvalue, setValue } = useContext(LoginContex);
  const [click, setClick] = useState(false);
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    if (click) {
      async function searching() {
        setLoading(true);
        const url =
          "https://coinranking1.p.rapidapi.com/coins/trending?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&limit=50&offset=0";
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
          
          // Safety check: only set array if data exists
          if (result.data && result.data.coins) {
            setArr(result.data.coins);
          } else {
            console.error("API returned no coins:", result);
            alert("No data found. Check your API key in Vercel settings.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          alert("Failed to connect to API.");
        } finally {
          setLoading(false);
          setClick(false); // Reset click state after fetch completes
        }
      }
      searching();
    }
  }, [click]);

  return (
    <div className="Home">
      <Header /> {/* Integrated the Header component */}

      <div className="header-welcome">
        <h2>Welcome, here we have top 50 crypto tokens</h2>
      </div>

      <div className="container button-container">
        <Link className="link" to={"/"}>
          <button>Home</button>
        </Link>
        <Link className="link" to={"/search"}>
          <button>Search</button>
        </Link>
        <button
          disabled={loading}
          onClick={() => setClick(true)}
        >
          {loading ? "Loading..." : "Refresh Coins"}
        </button>
      </div>

      <div className="coin">
        {arr.length > 0 ? (
          arr.map((items) => (
            <div key={items.uuid} className="itemList">
              <img className="coin-logo" src={items.iconUrl} alt={items.name} />
              <p><strong>Name:</strong> {items.name}</p>
              <p><strong>Symbol:</strong> {items.symbol}</p>
              <p><strong>Price:</strong> ${parseFloat(items.price).toFixed(2)}</p>
              <p><strong>Rank:</strong> {items.rank}</p>
              <p><strong>Change:</strong> {items.change}%</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3 className="head">
              {loading ? "Fetching data..." : "Click on the button to view the coins"}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
