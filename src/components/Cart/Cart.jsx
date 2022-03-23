import React, { Fragment } from "react";
import ContentLoader from "react-content-loader";
import { useState } from "react";
import AppContext from "../../context";

import styles from './Cart.module.scss';

function Cart({
  id,
  title,
  imageUrl,
  onFavorite,
  price,
  onPlus,
  favorited = false,
  loading = false
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);



  const onClickPlus = () => {
    onPlus({id, imageUrl, title, price});
  };

  const onClickFavorite = () => {
    onFavorite({id, imageUrl, title, price})
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {
        loading
          ? <ContentLoader
              speed={2}
              width={155}
              height={250}
              viewBox="0 0 155 265"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
              <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
              <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
              <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
              <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
          : <Fragment>
              <div onClick={onClickFavorite} className={styles.favorite}>
                  <img src={isFavorite ? '/img/heart-liked.svg' : "/img/heart-unliked.svg"} alt="unliked-icon" />
                </div>
                <img width={133} height={112} src={imageUrl} alt="sneakers-photo" />
                <h5>{title}</h5>
                <div className={styles.cardBottom}>
                  <div className="cardBottom__inner" >
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                  </div>
                  <img
                    onClick={onClickPlus}
                    src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                    alt="plus-logo" />
                </div>
            </Fragment>
      }
    </div>
  );
};

export default Cart;