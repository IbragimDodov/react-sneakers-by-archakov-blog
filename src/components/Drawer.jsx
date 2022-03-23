import React from "react";
import AppContext from "../context";
import Info from "./Info";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, items = [], onRemove}) {
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://623950fa63fdd477ac10ecb2.mockapi.io/orders', {
        items: cartItems,
      });
      // await axios.put('https://623950fa63fdd477ac10ecb2.mockapi.io/cart', []);
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < Array.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://623950fa63fdd477ac10ecb2.mockapi.io/cart/' + item.id);
        await delay(1000);
      }

    } catch (error) {
      alert('Не удалось создать заказ!');
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
        </h2>

        {
          items.length > 0
            ? 
              (<div>
                <div className="items">
                  {items.map((obj) => (
                    <div key={obj.id} className="cartItem">
                      <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                      <div className="cartItem__block">
                        <p>{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img
                        onClick={() => onRemove(obj.id)}
                        className="removeBtn"
                        src="/img/btn-remove.svg"
                        alt="remove-icon" />
                    </div>
                  ))}
                </div>
                <div className="cartTotalBlock-wrapper">
                  <ul className="cartTotalBlock">
                    <li>
                      <span>Итого:</span>
                      <div></div>
                      <b>21 498 руб.</b>
                    </li>
                    <li>
                      <span>Налог 5%:</span>
                      <div></div>
                      <b>1074 руб.</b>
                    </li>
                  </ul>
                  <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                    Оформить заказ
                    <img src="/img/arrow.svg" alt="arrow-icon" />
                  </button>
                </div>
              </div>)
            : (
              <Info
                title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                image={isOrderComplete ? "/img/complite-order.jpg" : "/img/empty-cart.jpg"} />
              )
        }
      </div>
    </div>
  );
};

export default Drawer;