import React,{useState, useEffect, useContext} from 'react'
import './Premium.css'
import Loader from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Modal from 'react-modal'
Modal.setAppElement("#root");
function Premium() {
    let y=0;
    const navigate = useNavigate()
    const {checkSignIn,unitBalance,buyToken,enterGame, currentAccount,referanceData, Language} = useContext(EthersContext)
    const [Units, setUnits] = useState(0)
    const [BUnits, setBUnits] = useState(0)
    const [Bunit1, setBunit1] = useState(0)
    const [ReferalBalance, setReferalBalance] = useState(0);
    const [isLoading, setisLoading] = useState(false)
    const [RFData, setRFData] = useState()
    const [In1, setIn1] = useState()
    const [Ben, setBen] = useState(0)
    
 const [isOpen, setIsOpen] = useState(false);
 const [isOpen1, setIsOpen1] = useState(false);
    const initiaor= async()=>{
        setisLoading(true)
        try{
            const s1 = await checkSignIn()
            if(s1!=2) navigate("/")
            const units = await unitBalance()
             setUnits(units[3])
            let  refer = units[2]
            refer = refer/1000000
            refer = refer.toFixed(2)
            setReferalBalance(refer)
            const bunits = units[0]
            setBunit1(bunits)
            let benifit =units[1]
            benifit = benifit*2
            setBen(benifit)
        }catch(e){
            console.log(e)
        }
        setisLoading(false)
    }
    const getReferenceDetails=  async()=>{
      console.log("hello")
     const x = await referanceData()
     setRFData(x)
    }

    const handleBuy= async()=>{
      setisLoading(true)
      alert(Language[0])
      if(Bunit1+In1>=90) return alert(Language[1])
     try{
        await buyToken(In1)
        alert( `Succefully bought ${In1} UNIT`)
        initiaor()
        setIsOpen1(false)
     } catch(e){
     console.log(e)
      // alert("Make sure you have 10 usdt in polygon blocchain, Note: if you have USDt in other blockchains please swap to polygon")
      alert(e.data.message)
    }
     setisLoading(false)
  }

  const handleLot= async()=>{
    setisLoading(true)
   try{
      await enterGame()
      alert(Language[2])
      initiaor()
   } catch(e){
   console.log(e)
   alert(e.data.message)
   }
   setisLoading(false)
}

    useEffect(() => {
      getReferenceDetails()
      initiaor()
    }, [])



  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function toggleModal1() {
    setIsOpen1(!isOpen1);
  }
    
  return isLoading? <Loader/>:
    <div className='p_main'>
        <div className='p_head'>{Language[3]}</div>
        <div className='Wallet'>
            <div className='wallet_head'>{Language[4]}</div>
            <div className='wallet_address'>{currentAccount}</div>
        </div>

        <div className='p_bottom'>
          <div className='p_details'>
              <div>
              <div className='sub_head'>{Language[5]}</div>
            <div className='sub_sub'>{Bunit1}/90</div>
              </div>
            
             <div>
             <div className='sub_head'>{Language[6]}</div>
            <div className='sub_sub'>{Bunit1+Ben/2-Units}</div>
             </div>
            
            </div>
            <div className='sub_head'>{Language[7]}</div>
            <div className='sub_sub'>{Ben}USDt | {Ben/2}Units</div>

            <div className='sub_head'>{Language[8]}</div>
            <div className='sub_sub'>{ReferalBalance} USDT</div>
              
            <div className='p_buttons' >
            <button className="button-9" role="button" onClick={toggleModal1}>{Language[9]}</button>
            <button className="button-9" role="button" onClick={handleLot}>{Language[10]}</button>
            </div>
            <div className='p_rec'>{Language[11]}</div>

            <div className='p_cards'>
                <div className='p_card'>
                    <div className='p_card_head'>Level 1</div>
                    <div className='p_card_sub'>{RFData? RFData[0]: "xxx"}</div>

                    <div className='p_card_head'>Level 2</div>
                    <div className='p_card_sub'>{RFData? RFData[1]: "xxx"}</div>

                    <div className='p_card_head'>Level 3</div>
                    <div className='p_card_sub'>{RFData? RFData[2]: "xxx"}</div>
                </div>

                <div className='p_card'>
                    <div className='p_card_head'>Level 4</div>
                    <div className='p_card_sub'>{RFData? RFData[3]: "xxx"}</div>

                    <div className='p_card_head'>Level 5</div>
                    <div className='p_card_sub'>{RFData? RFData[4]: "xxx"}</div>

                    <div className='p_card_head'>Level 6</div>
                    <div className='p_card_sub'>{RFData? RFData[5]: "xxx"}</div>
                </div>

                <div className='p_card'>
                    <div className='p_card_head'>Level 7</div>
                    <div className='p_card_sub'>{RFData? RFData[6]: "xxx"}</div>

                    <div className='p_card_head'>Level 8</div>
                    <div className='p_card_sub'>{RFData? RFData[7]: "xxx"}</div>

                    <div className='p_card_head'>Level 9</div>
                    <div className='p_card_sub'>{RFData? RFData[8]: "xxx"}</div>
                </div>
            </div>
          
        </div>

        {/* <div className='reffer_card'> */}
            <button className='reffer_btn' onClick={toggleModal}>{Language[12]}</button>

<Modal
  isOpen={isOpen}
  onRequestClose={toggleModal}
  contentLabel="My dialog"
  className="mymodal"
  overlayClassName="myoverlay"
  closeTimeoutMS={500}
>
  <div className='md_1'>
    <p>{Language[13]} :</p>
    <a href='http://gcu.vercel.app'>http://gcu.vercel.app</a>
    <p>referral id:</p></div>
  <div className='md_5'>{currentAccount}</div>
  <button onClick={toggleModal} className="md_3">{Language[16]} X</button>
</Modal>

<Modal
  isOpen={isOpen1}
  onRequestClose={toggleModal1}
  contentLabel="My dialog"
  className="mymodal"
  overlayClassName="myoverlay"
  closeTimeoutMS={500}
>
  <div className='md_1'>{Language[14]} (max {90-Bunit1})</div>
  <input className='in_2' onChange={(e)=>{setIn1(e.target.value)}} type="number"></input>
  <div onClick={handleBuy} className="button-x">{Language[15]}</div>
  <button onClick={toggleModal1} className="md_3">{Language[16]} X</button>
</Modal>
    </div>
  
}

export default Premium