// import logo from './logo.svg';
import './App.css';
import './font.css'

import { Route, Routes } from 'react-router-dom';

//screen
import { Home } from './screen/Home';
import { Book } from './screen/Book';
import { BookInfo } from './screen/BookInfo';
import { MainProfile } from './screen/Profile/MainProfile';
import { BorrowList } from './screen/Profile/BorrowList';
import { Favourite } from './screen/Profile/Favourite';
import { BookCart } from './screen/cart/BookCart';

//component
import { MyNavbar } from './component/MyNavbar';
function App() {
  return (
    <div className='Gentium-R-font relative'>
      {/* navbar */}
      <MyNavbar />

      {/* Route Page */}
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/all-books' element={<Book />} />
        <Route path='/book-info' element={<BookInfo />} />
        <Route path='profile' element={<MainProfile />}>
          <Route path='borrow-list' element={<BorrowList />} />
          <Route path='favourite' element={<Favourite />} />
        </Route>
        <Route path='borrow-cart' element={<BookCart />} />
      </Routes>
    </div>
  );
}

export default App;


//ของที่ได้มาตอนสร้าง React Project
/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p className='Gentium-B'>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */
