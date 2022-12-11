// import logo from './logo.svg';
import './App.css';
import './font.css';
import './styles.css';

import { Route, Routes } from 'react-router-dom';

//screen
import { Home } from './screen/Home';
import { Book } from './screen/Books/Book';
import { BookInfo } from './screen/Books/BookInfo';
import { MainProfile } from './screen/Profile/MainProfile';
import { BorrowList } from './screen/Profile/BorrowList';
import { Favourite } from './screen/Profile/Favourite';
import BookingHistory from './screen/Profile/BookingHistory';
import EditProfile from './screen/Profile/EditProfile';
import { BookCart } from './screen/Cart/BookCart';
import WorkSpace from './screen/WorkSpaces/WorkSpace';
import WorkSpaceDetail from './screen/WorkSpaces/WorkSpaceDetail';
import BookingWorkSpace from './screen/WorkSpaces/BookingWorkSpace';
import FindARoom from './screen/WorkSpaces/FindARoom';
import AddEquipments from './screen/WorkSpaces/AddEquipments';
import Payment from './screen/WorkSpaces/Payment';
import MainManage from './screen/Management/MainManage';
import BookManage from './screen/Management/BookManage';
import BorrowManage from './screen/Management/BorrowManage';
import EquipmentsManage from './screen/Management/EquipmentsManage';
import OrderManage from './screen/Management/OrderManage';
import WorkSpaceManage from './screen/Management/WorkSpaceManage';

//component
import { MyNavbar } from './component/MyNavbar';
function App() {
  return (
    <div className='Gentium-R-font relative '>
      {/* navbar */}
      <MyNavbar />

      {/* Route Page */}
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/all-books' element={<Book />} />
        <Route path='/book-info' element={<BookInfo />} />
        <Route path='/borrow-cart' element={<BookCart />} />
        <Route path='/all-spaces' element={<WorkSpace />} />
        <Route path='/space-info' element={<WorkSpaceDetail />} />
        <Route path='booking' element={<BookingWorkSpace />}>
          <Route path='find-a-room' element={<FindARoom />} />
          <Route path='equipments' element={<AddEquipments />} />
          <Route path='payment' element={<Payment />} />
        </Route>
        <Route path='profile' element={<MainProfile />}>
          <Route path='borrow-list' element={<BorrowList />} />
          <Route path='favourite' element={<Favourite />} />
          <Route path='booking-history' element={<BookingHistory />} />
          <Route path='edit-profile' element={<EditProfile />} />
        </Route>
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
