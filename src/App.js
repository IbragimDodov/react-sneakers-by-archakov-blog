import React from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";


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
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  React.useEffect(() => {
    axios.get('https://623950fa63fdd477ac10ecb2.mockapi.io/items')
      .then(res => {
        setItems(res.data);
      });
    axios.get('https://623950fa63fdd477ac10ecb2.mockapi.io/cart')
      .then(res => {
        setCartItems(res.data);
      });
    axios.get('https://623950fa63fdd477ac10ecb2.mockapi.io/favorites')
      .then(res => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://623950fa63fdd477ac10ecb2.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://623950fa63fdd477ac10ecb2.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    // setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://623950fa63fdd477ac10ecb2.mockapi.io/favorites/${obj.id}`);
        // setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const {data} = await axios.post('https://623950fa63fdd477ac10ecb2.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  

  return (
    <div className="wrapper">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      
      <Routes>
        <Route path="/" exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />} />
        <Route path="/favorites" exact element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
      
    </div>
  );
}

export default App;
