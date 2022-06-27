import React, {useState, useContext, useEffect} from 'react'
import '../Styles/NFTreveal.css'
import {EthersContext} from '../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Comonents/Loading/Loader'
import Loader2 from '../Comonents/Loader2/Loader2'

function NFTreveal() {
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
 console.log(y)
  if(y==0 && y==null) {
    navigate('/')}

  const timer = setTimeout(() => {
  z=1
  if(y) setisLoading(false)
  }, 5000);
  if(z===1) setisLoading(false)
  }

useEffect(() => {
  initiator()
}, [])


// useEffect(async() => {

//   return () =>{clearTimeout(timer);}

// }, [])

return isLoading? <Loader2/>:
 <div className='reveal_main'>
  <div className='reveal_head'>
    CONGRATULATIONS
  </div>
  <div className='r_sub_head text-center'>You have recieved a FomoSapien NFT</div>

  <div className='r_nft_card'>
   {(Id)? <img src={`https://bafybeih4jexe4qol7q7c4jxxjmx6u54rec7f2opqfvvf2nde6uq42ftqmy.ipfs.dweb.link/${Id}.png`} className='r_nft_img'/>:<div>No NFT found</div>}

  </div>

  <div>
   <button className="button-64 mt-4" role="button" onClick={()=>{navigate('/view')}}><span class="text">View on NFT page</span></button>
   </div>
 </div>
   
}

export default NFTreveal