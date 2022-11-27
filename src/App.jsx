// import logo from './logo.svg';
import './App.css';
import './font.css'
import { TextField } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai'
function App() {
  return (
    <div className='Gentium-R'>

      {/* Navbar */}
      <div className='w-full h-16 px-10 bg-white drop-shadow flex justify-center'>
        <div className='w-[1440px] h-16 flex items-center bg-white relative'>
            {/* Nav title */}
          <div className='mr-14'>
            <p className='Gentium-B text-3xl cursor-pointer'>BRAWER</p>
          </div>
          {/* Nav Search Bar */}
          <div className='flex items-center mr-14'>
            <AiOutlineSearch size={20} className='mr-4' />
            <TextField id="outlined-basic" variant="outlined" size='small'/>
          </div>
          {/* Choice to loan item */}
          <div className='flex'>
            <p className='text-2xl mr-10 cursor-pointer'>Book</p>
            <p className='text-2xl cursor-pointer'>WorkSpace</p>
          </div>
          <div className='absolute right-0 cursor-pointer'>
            <img src={require('./sek.jpg')} className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
      {/* <header className="App-header">
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
      </header> */}
    </div>
  );
}

export default App;
