import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart";

const arr = [
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg'},
  {title: 'Мужские Кроссовки Nike Air Max 270', price: 8499, imageUrl: '/img/sneakers/2.jpg'},
  {title: 'Мужские Кроссовки Nike Kyrie 7', price: 7999, imageUrl: '/img/sneakers/3.jpg'},
  {title: 'Мужские Кроссовки Nike LeBron XVIII', price: 15600, imageUrl: '/img/sneakers/4.jpg'}
];

function App() {
  return (
    <div className="wrapper">
      <Drawer />
      <Header />
      <div className="content">
        <div className="content__inner">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search-icon" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="cards">
          {arr.map((obj) => (
            <Cart title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
