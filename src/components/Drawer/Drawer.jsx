import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, items = [], onRemove, opened}) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://60d62397943aa60017768e77.mockapi.io/orders', {
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://60d62397943aa60017768e77.mockapi.io/cart/' + item.id);
        await delay(1000);
      }

    } catch (error) {
      alert('Не удалось создать заказ!');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2>Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
        </h2>

        {
          items.length > 0
            ? 
              (<div>
                <div className={styles.items}>
                  {items.map((obj, index) => (
                    <div key={obj.id + index} className={styles.cartItem}>
                      <div style={{backgroundImage: `url(${obj.imageUrl})`}} className={styles.cartItemImg}></div>
                      <div className={styles.cartItem__block}>
                        <p>{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img
                        onClick={() => onRemove(obj.id)}
                        className={styles.removeBtn}
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
                      <b>{totalPrice} руб.</b>
                    </li>
                    <li>
                      <span>Налог 5%:</span>
                      <div></div>
                      <b>{totalPrice / 100 * 5} руб.</b>
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