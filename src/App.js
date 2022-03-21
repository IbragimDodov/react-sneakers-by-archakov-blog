import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Cart from "./components/Cart";



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
          <Cart/>
        </div>
      </div>
    </div>
  );
}

export default App;
