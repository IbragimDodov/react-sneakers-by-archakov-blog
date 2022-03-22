import React from "react";

function Drawer({onClose, items = []}) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
        </h2>

        <div className="items">

          {items.map((obj) => (
            <div className="cartItem">
              <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
              <div className="cartItem__block">
                <p>{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
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
    </div>
  );
};

export default Drawer;