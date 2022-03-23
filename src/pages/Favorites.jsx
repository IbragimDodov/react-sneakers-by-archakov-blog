import React from "react";
import Cart from "../components/Cart/Cart";

function Favorites({items, onAddToFavorite}) {
  return (
    <div className="content">
      <div className="content__inner">
        <h1>Главные закладки</h1>
        
      </div>
      <div className="cards">
        {items
          .map((item, index) => (
            <Cart
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;