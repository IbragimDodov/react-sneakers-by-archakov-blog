import React from "react";
import { useState } from "react";

import styles from './Cart.module.scss';

function Cart({onFavorite, imageUrl, title, price, onPlus}) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({imageUrl, title, price});
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div onClick={onFavorite} className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="unliked-icon" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers-photo" />
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div cardBottom__inner>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="plus-logo" />
      </div>
    </div>
  );
};

export default Cart;