import React from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart";
import { useState, useEffect } from "react";


// const arr = [
//   {"title": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 12999, "imageUrl": "/img/sneakers/1.jpg"},
//   {"title": "Мужские Кроссовки Nike Air Max 270", "price": 8499, "imageUrl": "/img/sneakers/2.jpg"},
//   {"title": "Мужские Кроссовки Nike Kyrie 7", "price": 7999, "imageUrl": "/img/sneakers/3.jpg"},
//   {"title": "Мужские Кроссовки Under Armour Curry 8", "price": 11299, "imageUrl": "/img/sneakers/4.jpg"},
//   {"title": "Мужские Кроссовки Nike Kyrie Flytrap IV", "price": 10799, "imageUrl": "/img/sneakers/5.jpg"},
//   {"title": "Кроссовки Puma X Aka Boku Future Rider", "price": 13999, "imageUrl": "/img/sneakers/6.jpg"},
//   {"title": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 11433, "imageUrl": "/img/sneakers/7.jpg"},
//   {"title": "Мужские Кроссовки Nike Lebron XVIII Low", "price": 6300, "imageUrl": "/img/sneakers/8.jpg"},
//   {"title": "Мужские Кроссовки Jordan Air Jordan 11", "price": 4293, "imageUrl": "/img/sneakers/9.jpg"}
// ];

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  React.useEffect(() => {
    fetch('https://623950fa63fdd477ac10ecb2.mockapi.io/items')
    .then(res => res.json())
    .then(json => setItems(json))
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
  };
  

  return (
    <div className="wrapper">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content">
        <div className="content__inner">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search-icon" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="cards">
          {items.map((item) => (
            <Cart
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
