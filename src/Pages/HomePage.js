import React , {useState, useContext, useEffect} from 'react'
import '../Styles/Home.css'
import {EthersContext} from '../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Comonents/Loading/Loader'
import { Col ,Row} from 'react-bootstrap'
import fomosapien from '../images/Fomo_logo.png'
function HomePage() {
  const navigate  = useNavigate()
  const {buyingProcess,getCurrentPrice,checkIfWalletIsConnect,getUserBalance} = useContext(EthersContext)
const [isLoading, setisLoading] = useState(false)
const [Price, setPrice] = useState(0)
const initiator = async()=>{
setisLoading(true)
const  s1 = await checkIfWalletIsConnect()
if(s1===0){
 navigate("/landing")
}else{
let y = await getUserBalance()
console.log(y)
if(y!=0 && y!=null) navigate('/view')
const x = await getCurrentPrice()
console.log(x)
if(x) setPrice(x)
}
setisLoading(false)
}
const handleClick = async()=>{
  setisLoading(true)
  const tx =await buyingProcess()
  if(tx) navigate('/reveal')
  setisLoading(false)
}
useEffect(() => {
initiator()
}, [])

return isLoading? <Loader/>:
    <div className='home_main'>
      <Row>
        <Col sm={12} md={12} lg={6} className="home_left">
        <div >
          <div className='left_head'>Get your hands on</div>
          <div className='left_head flex'><img src={fomosapien} className='fomo_logo -ml-5'></img> <div className='mt-2.5'>NFT</div></div>
          <div className='nft_desc'>Buy now to get at the lowest price possible</div>
          <div className='nft_price_head'>Current Price:-</div>
          <div className='nft_price'>{Price} Matic</div>
          <div className=''><button className="button-85 mt-3 ml-2" onClick={handleClick}>Buy Now</button>
            </div>
          </div>


        </Col>
        <Col sm={12} md={12} lg={6}>
        <div className='Nft_logo'>
            <div className='nft_card text-center'> Buy to UNLOCK...</div>
        </div>
        </Col>
        </Row>
    </div>

}

export default HomePage