import React from "react";

import styles from './Cart.module.scss';

function Cart(props) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="unliked-icon" />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="sneakers-photo" />
      <h5>{props.title}</h5>
      <div className={styles.cardBottom}>
        <div cardBottom__inner>
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="plus-logo" />
        </button>
      </div>
    </div>
  );
};

export default Cart;