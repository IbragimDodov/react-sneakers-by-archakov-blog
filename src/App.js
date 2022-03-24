import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


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
  const [isLoading, setIsLoading] = useState(true);

  

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://623950fa63fdd477ac10ecb2.mockapi.io/cart'),
          axios.get('https://623950fa63fdd477ac10ecb2.mockapi.io/favorites'),
          axios.get('https://623950fa63fdd477ac10ecb2.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('some luzy error :)');
      }
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) == Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://623950fa63fdd477ac10ecb2.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post('https://623950fa63fdd477ac10ecb2.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId == data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('ddd');
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://623950fa63fdd477ac10ecb2.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('ddd');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://623950fa63fdd477ac10ecb2.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
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
  
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        
        <Routes>
          <Route path="/" exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading ={isLoading}
              />} />
          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
