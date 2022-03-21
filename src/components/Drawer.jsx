import React from "react";

function Drawer() {
  return (
    <div style={{display: 'none'}} className="overlay">
      <div className="drawer">
        <h2>Корзина
          <img className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
        </h2>

        <div className="items">
          <div className="cartItem">
            {/* <img width={70} height={70} src="/img/sneakers/1.jpg" alt="sneakers-img" /> */}
            <div style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
            <div className="cartItem__block">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
          </div>
          <div className="cartItem">
            {/* <img width={70} height={70} src="/img/sneakers/1.jpg" alt="sneakers-img" /> */}
            <div style={{backgroundImage: 'url(/img/sneakers/3.jpg)'}} className="cartItemImg"></div>
            <div className="cartItem__block">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove-icon" />
          </div>
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