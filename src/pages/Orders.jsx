import React, { useContext } from "react";
import axios from "axios";
import Cart from "../components/Cart/Cart";
import AppContext from "../context";

function Orders() {
  const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('https://60d62397943aa60017768e77.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Some funny error');
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="content__inner">
        <h1>Мои заказы</h1>
      </div>

      <div className="cards">
        {(isLoading ? [...Array(9)] : orders).map((item, index) => (
            <Cart
              key={index}
              loading={isLoading}
              {...item}
            />
        ))}
      </div>
    </div>
  );
};

export default Orders;
