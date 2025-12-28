import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"; // Added useContext
import { LoginContex } from "./Context"; // Added context import
import "./styles.css";

export default function Search() { // Capitalized 'S'
  const [click, setClick] = useState(false);
  const { fvalue, setValue } = useContext(LoginContex); // Using shared context
  const [dt, setData] = useState(null);

  useEffect(() => {
    if (click && fvalue) { // Only search if there is a value
      async function searching() {
        const url = `https://coinranking1.p.rapidapi.com/coin/${fvalue}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY, // Removed quotes
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setData(result.data.coin);
          setClick(false); // Reset click state
        } catch (error) {
          console.error(error);
          setClick(false);
        }
      }
      searching();
    }
  }, [click]); // Removed fvalue from dependency to prevent infinite loops

  return (
    <div className="searching">
      <div className="input12">
        <input
          className="inputing"
          type="text"
          value={fvalue}
          placeholder="write the coin uuid"
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button onClick={() => setClick(true)}>Search</button>
        <div className="link">
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        </div>
      </div>
      <div className="details">
        {dt && (
          <div className="details1">
            <p>Name: {dt.name}</p>
            <p>Symbol: {dt.symbol}</p>
            <p>Price: ${Number(dt.price).toLocaleString()}</p>
            <p>Rank: {dt.rank}</p>
            <img className="coin-logo" src={dt.iconUrl} alt={dt.name} />
            <p>Description: {dt.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
