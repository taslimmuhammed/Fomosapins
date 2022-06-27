import React, {useState, useContext, useEffect} from 'react'
import '../Styles/NFTPage.css'
import {EthersContext} from '../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Comonents/Loading/Loader'
import fomosapien from '../images/Fomo_logo.png'
import Loader2 from '../Comonents/Loader2/Loader2'
function NFTpage() {
const navigate  = useNavigate()
const [isLoading, setisLoading] = useState(false)
const [Id, setId] = useState()
const {getOwnedNFt,userBalnce} = useContext(EthersContext)
const initiator = async()=>{
  let z= 0
  setisLoading(true)
  let y = await getOwnedNFt()
  console.log(y)
  setId(y)

  if(y==0 && y==null) {
    alert("NO NFT's found")
    navigate('/')}
    setId(y)


  const timer = setTimeout(() => {
  z=1
  if(y) setisLoading(false)
  }, 5000);
  if(z===1) setisLoading(false)
  }

useEffect(() => {
  initiator()
}, [])
return isLoading? <Loader2/>:
<div className='reveal_main'>
<div className='left_head flex'> <div className='mt-2.5'>Your</div> <img src={fomosapien} className='fomo_logo'></img> <div className='mt-2.5'>NFT</div></div>

<div className='r_nft_card'>
   {(Id!=0||Id==null) && <img src={`https://bafybeih4jexe4qol7q7c4jxxjmx6u54rec7f2opqfvvf2nde6uq42ftqmy.ipfs.dweb.link/${Id}.png`} className='r_nft_img'/>}
  </div>
</div>
  
}

export default NFTpage