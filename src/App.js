import './App.css';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import React, {useState, useContext} from "react"
import { EthersContext } from './Context/EthersContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import NFTreveal from './Pages/NFTreveal';
import NFTpage from './Pages/NFTpage';
import AdminPage from './Pages/AdminPage';
function App() {
 
  return (
    <div className="gradient__bg mainScreen">
       
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage/>}></Route>
          <Route path='/landing' exact element={<LandingPage/>}></Route>
          <Route path='/reveal' exact element={<NFTreveal/>}></Route>
          <Route path='/view' exact element={<NFTpage/>}></Route>
          <Route path='/admin' exact element={<AdminPage/>}></Route>   
        </Routes>
      </Router>
      {/* <div className='l_Bottom margin'>&#169;Global Community Union</div>
       */}
    </div>
  );
}

export default App;
