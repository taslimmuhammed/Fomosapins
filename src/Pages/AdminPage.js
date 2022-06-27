import React,{useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../Comonents/Loading/Loader'
import {EthersContext} from '../Context/EthersContext'

import '../Styles/Admin.css'
function Admin() {
const navigate  = useNavigate()
const [isLoading, setisLoading] = useState(false)
const { changePrice,getCurrentPrice,changeOwner,checkOwner,transferToContract,getContractBalance} = useContext(EthersContext)
const [Address, setAddress] = useState()
const [Price, setPrice] = useState(0)
const [Balance, setBalance] = useState(0)
const [Price2, setPrice2] = useState()
// const [Tokens, setTokens] = useState()
// const transferToContract1 = async()=>{
//     setisLoading(true)
//     const str = Tokens
//     const result = str.split(/[, ]+/);
//     console.log(result); 
//    await transferToContract(result)
//    setisLoading(false)
//    initiator()
// }
const initiator = async()=>{
    setisLoading(true)
    try{
     const v = await checkOwner()
     const l1  = await getCurrentPrice()
     const l2 = await getContractBalance()
     if(l2) setBalance(l2)
     if(l1) setPrice2(l1)
     if(v!=true) {
         alert("Not Authorized")
         navigate('/')
     }
    }catch(e){
        console.log(e)
        alert(e)
    }
    setisLoading(false)
}

const changeOwner1=async()=>{
   setisLoading(true)
   if(Price===null) return alert("Type in the new owner address")
   await changeOwner(Address)
   setisLoading(false)
   initiator()
}

const changePrice1=async()=>{
    setisLoading(true)
    if(Address===null){return( alert("Type in the new price"))}
    await changePrice(Price)
    setisLoading(false)
    initiator()
 }

//  const withDr = async()=>{
//     var answer = window.confirm("Save data?");
//     if (answer) {
//         setisLoading(true)
//         await withdrawUsdt()
//         setisLoading(false)
//     }
//     else {
//         alert("withdrawal cancelled")
//     }

//  }
  
useEffect(() => {
    initiator()
}, [])

  return isLoading? <Loader/>:
  <div className=' w-full flex justify-center flex-col items-center'>
      <div className='h_head'> Admin Panel</div>
      <div className='h_box  text-white text-lg'>
          <div  className='mb-1'> Current Price of token:</div>
          <div className='text-green-400 mb-3'>{Price2}</div>
          <div className='mb-1'> Total number of NFT's left in the contract:</div>
          <div className='text-green-400  mb-3'>{Balance}</div>
          <div className='mb-1'>Transfer ownership</div>
          <input placeholder="new Address" className='text-black  mb-1' onChange={(e)=>{setAddress(e.target.value)}}></input>
          <button className="button-8  mb-3" role="button" onClick={changeOwner1}>Change Owner</button>
          <div className='mb-1'>Change Price of NFT</div>
          <input placeholder="new Price" className='text-black mb-1' onChange={(e)=>{setPrice(e.target.value)}}></input>
          <button className="button-8" role="button" onClick={changePrice1}>Change Price</button>
          {/* <input placeholder="tokens " className='text-black' onChange={(e)=>{setTokens(e.target.value)}}></input>
          <button className="button-8" role="button" onClick={transferToContract1}>Trasfer</button> */}
      </div>
  </div>
}

export default Admin