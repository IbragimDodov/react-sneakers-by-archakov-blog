import React from "react";

function Cart() {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/heart-unliked.svg" alt="unliked-icon" />
      </div>
      <img width={133} height={112} src="/img/sneakers/1.jpg" alt="sneakers-photo" />
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="cardBottom">
        <div cardBottom__inner>
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="plus-logo" />
        </button>
      </div>
    </div>
  );
};

export default Cart;