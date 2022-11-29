// import logo from './logo.svg';
import './App.css';
import './font.css'

import { Route, Routes } from 'react-router-dom';

//screen or component
import { Home } from './screen/Home';
import { Book } from './screen/Book';
import { BookInfo } from './screen/BookInfo';
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
