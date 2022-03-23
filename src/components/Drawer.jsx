import React from "react";

function Drawer({onClose, items = [], onRemove}) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
        </h2>

        {
          items.length > 0
            ? 
              <div>
                <div className="items">
                  {items.map((obj) => (
                    <div className="cartItem">
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
                  <button className="greenButton">
                    Оформить заказ
                    <img src="/img/arrow.svg" alt="arrow-icon" />
                  </button>
                </div>
              </div>
            : 
              <div className="cartEmpty">
                <img width={120} height={120} src="/img/empty-cart.jpg" alt="cart-img" />
                <h2>Корзина пустая</h2>
                <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                <button onClick={onClose} className="greenButton">
                  <img src="/img/arrow.svg" alt="arrow" /> Вернуться назад
                </button>
              </div>
        }
      </div>
    </div>
  );
};

export default Drawer;