import React from "react";
import Cart from "../components/Cart/Cart";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {

  const renderItems = () => {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(9)] : filteredItems).map((item, index) => (
      <Cart
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content">
      <div className="content__inner">
        <h1>{ searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block">
          {searchValue && (
            <img
              width={23}
              height={23}
              onClick={() => setSearchValue('')}
              src="/img/btn-remove.svg"
              alt="remove-icon" />)}
          <img src="/img/search.svg" alt="search-icon" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="cards">
        {renderItems()}
      </div>
    </div>
  );
};

export default Home;