import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";
export default function search() {
  const [click, setClick] = useState(false);
  const [fvalue, setValue] = useState("");
  const [dt, setData] = useState(null);

  useEffect(() => {
    if (click) {
      async function searching() {
        const url = `https://coinranking1.p.rapidapi.com/coin/${fvalue}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "process.env.REACT_APP_RAPIDAPI_KEY",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setData(result.data.coin);
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
      searching();
    }
  }, [click, fvalue]);
  return (
    <div className="searching">
      <div className="input12">
        <input
          className="inputing"
          type="text"
          value={fvalue}
          placeholder="write the coin uuid "
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button
          onClick={() => {
            setClick((prev) => {
              return !prev;
            });
          }}
        >
          Search
        </button>
        <div className="link">
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        </div>
      </div>
      <div className="details">
        {dt && (
          <div className="details1">
            {" "}
            <p>Description: {dt.description}</p>
            <p>Symbol: {dt.symbol}</p>
            <p>
              Icon: <img src={dt.iconUrl} />
            </p>
            <p>Name: {dt.name}</p>
            <p>Number of Exchanges: {dt.numberOfExchanges}</p>
            <p>Price: {dt.price}</p>
            <p>Website: {dt.websiteUrl}</p>
            <p>Rank: {dt.rank}</p>
            <p>Price at: {dt.priceAt}</p>
            <p>Number of Markets: {dt.numberOfMarkets}</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
