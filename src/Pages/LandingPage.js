import React, {useState, useContext, useEffect} from 'react'
import '../Styles/Landing.css'
import {EthersContext} from '../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Comonents/Loading/Loader'

function LandingPage() {
  const {connectWallet,currentAccount} = useContext(EthersContext)
  const checker = async () => {
    if(currentAccount!=null){
      console.log("navigating from lading page")
     navigate("/")
    }
  }
  useEffect(() => {
   checker()
  }, [currentAccount])
  const navigate  = useNavigate()
const [isLoading, setisLoading] = useState(false)
const handleClick = async()=>{
  setisLoading(true)
  await connectWallet()
  setisLoading(false)
  navigate('/')
}


return isLoading? <Loader/>:
    <div className='loader_main'>
       <button className="button-63" onClick={handleClick}>Connect to MetaMask Wallet</button>
    </div>
  
}

export default LandingPage