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
import BookStock from './screen/Management/BookStock';
import BorrowManage from './screen/Management/BorrowManage';
import EquipmentsStock from './screen/Management/EquipmentsStock';
import BookingManage from './screen/Management/BookingManage';
import WorkSpaceManage from './screen/Management/WorkSpaceManage';
import NotFoundPage from './component/NotFoundPage';

import { Provider} from 'react-redux';
import { store } from './store';

//component
import { MyNavbar } from './component/MyNavbar';

//
import { Navigate } from 'react-router-dom';

function App() {
  const userCheck = () =>{
    console.log(store.getState().user_data.user)
    return store.getState().user_data.user
  }
  const ProtectedRoute = ({ user, children }) => {
    if (!user()) {
      alert("Please Sign in before booking")
      return <Navigate to="/" replace />;
    }

    return children;
  };
  return (
    <Provider store={store}>
      <div className='Gentium-R-font relative '>
        {/* navbar */}
        <MyNavbar/>

        {/* Route Page */}
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/all-books' element={<Book />} />
          <Route path='/book-info' element={<BookInfo />} />
          <Route path='/borrow-cart' element={<BookCart />} />
          <Route path='/all-spaces' element={<WorkSpace />} />
          <Route path='/space-info' element={<WorkSpaceDetail />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path='booking' element={
            <ProtectedRoute user={userCheck}>
              <BookingWorkSpace />
            </ProtectedRoute>
          }>
            <Route path='find-a-room' element={<FindARoom />} />
            <Route path='equipments' element={<AddEquipments />} />
            <Route path='payment' element={<Payment />} />
          </Route>
          <Route path='profile' element={<MainProfile />}>
            <Route path='borrow-list' element={<BorrowList />} />
            <Route path='favourite' element={<Favourite />} />
            <Route path='booking-history' element={<BookingHistory />} />
            {/* <Route path='edit-profile' element={<EditProfile />} /> */}
          </Route>
          <Route path='management' element={<MainManage />}>
            <Route path='booking-manage' element={<BookingManage />} />
            <Route path='borrow-manage' element={<BorrowManage />} />
            <Route path='book-stock' element={<BookStock />} />
            <Route path='workspace-manage' element={<WorkSpaceManage />} />
            <Route path='equipments-stock' element={<EquipmentsStock />} />
          </Route>
        </Routes>
      </div>
    </Provider>
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
