import { useContext, useEffect, useState } from "react";
import { LoginContex } from "./Context";
import { Link } from "react-router-dom";
import "./styles.css";
export default function Home() {
  const { fvalue, setValue } = useContext(LoginContex);
  const [click, setClick] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (click) {
      async function searching() {
        const url =
          "https://coinranking1.p.rapidapi.com/coins/trending?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&limit=50&offset=0";
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "92499a197bmsh972c66ee05be7d5p1b39e8jsn790740eff152",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          const data1 = result.data;
          const coin1 = data1.coins;
          setArr(coin1);
          console.log(result);
          console.log(data1);
          console.log(coin1);
        } catch (error) {
          console.error(error);
        }
      }
      searching();
      setClick(false);
    }
  }, [click]);

  return (
    <div className="Home">
      <div className="Logo">
        <img
          className="logo2"
          src="https://rapidapi-prod-apis.s3.amazonaws.com/c3736925-9c98-4fdc-857e-07c11146afb7.png"
        />{" "}
        <h2 className="heading433">CryptoCurrency</h2>
      </div>
      <div className="header">
        <h2> Welcome,Here we have top 50 crypto token</h2>
      </div>
      <div className="container button-container">
        <Link className="link" to={"/"}>
          <button>Home</button>
        </Link>
        <Link className="link" to={"/search"}>
          <button>Search</button>
        </Link>
        <button
          onClick={() => {
            setClick((prev) => {
              return !prev;
            });
          }}
        >
          Add
        </button>
      </div>
      <div className="coin">
        {arr ? (
          arr.map((items) => (
            <div key={items.uuid} className="itemList">
              <p>name : {items.name}</p>
              <p>symbol : {items.symbol}</p>
              <p>price : {items.price}</p>
              <p> rank : {items.rank}</p>
              <p>market-cap :{items.marketCap}</p>
              <p>change: {items.change}</p>
              <p>uuid : {items.uuid}</p>
              <img src={items.iconUrl} />
            </div>
          ))
        ) : (
          <h3 className="head">
            <p>Click on the add botton to view the coin</p>
          </h3>
        )}
      </div>
    </div>
  );
}
