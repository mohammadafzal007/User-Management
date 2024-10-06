import './App.css';
import Home from './Components/Home';
import { Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Toaster } from 'react-hot-toast';
import Userinfo from './Components/Userinfo';

function App() {

  return (
    <>
    <Navbar />
    {/* <New /> */}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/:id" element={<Userinfo />} />

      
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
