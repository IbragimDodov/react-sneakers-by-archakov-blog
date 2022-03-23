import React, { useContext } from "react";
import Cart from "../components/Cart/Cart";
import AppContext from "../context";

function Favorites() {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="content__inner">
        <h1>Главные закладки</h1>
      </div>

      <div className="cards">
        {favorites.map((item, index) => (
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
