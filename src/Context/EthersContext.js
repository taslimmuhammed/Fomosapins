import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { NFTAbi } from "../Utils/NFT_abi";
import { English } from "../Comonents/Languages/English";
import { Chinese } from "../Comonents/Languages/Chinese";
export const EthersContext = createContext(null);
const {ethereum} = window
export default function Ethers({children}){
    const [currentAccount, setCurrentAccount] = useState(null);
    // Seller Contract
    const contractAddress = "0xF9130C2a5B7FF79B1eCFd8Fc68ba59B5F52CA169"
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const SellerContract = new ethers.Contract(contractAddress, abi,signer)


    //NFT Contract
    const NFTContractAddress  =  "0x9b965cc2c150bF9e7Cd5bEa7cd0507cdd96f3793"
    const NFTContract = new ethers.Contract(NFTContractAddress, NFTAbi,signer)
    const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setCurrentAccount(accounts[0]); 
          return 1;
        } else {
          alert("No accounts found");
          return 0;
        }
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    const connectWallet = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");   
      }
    };

  
  
      const checkOwner = async()=>{
        try{
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
           const ownerAddress = await SellerContract.owner()
           let x= false;
           if(account.toUpperCase()===ownerAddress.toUpperCase()) x=true
           return x
        }
        catch(e){
          console.log(e)
        }
      }

      const changeOwner = async(address)=>{
        try{
          const tx = await SellerContract.transferOwnership(address)
          tx.wait()
        }
        catch(e){
          console.log(e)
          alert("error transferring ownership")
        }
      }

      const  getUserBalance = async()=>{
        try{
          console.log("hello")
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          
          const s1 = await SellerContract.owned(account)
          let x =  parseInt(s1._hex, 16)
          return x;
        }catch(e){
          alert("error getting NFT")
        }
        return 0
      }

      const getOwnedNFt = async()=>{
        try{
          console.log("hello")
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          
          const s1 = await NFTContract.walletOfOwner(account)
          let y = s1.length - 1
          let x =  parseInt(s1[y]._hex, 16)
          console.log(x,"index")
          return x;
        }catch(e){
          alert("error getting NFT")
        }
        return 0
      }

      const BuyNFTToken = async(tokenID)=>{
        try{
          const tokenPrice = await SellerContract.price()
           let pr = tokenPrice 
           const overrides = {
             value: tokenPrice,
             gasLimit: 300000
           };
           console.log(tokenID, overrides)
           const tx = await SellerContract.buyToken(tokenID,overrides)
           await tx.wait()
           tx ? alert("Buying Succeful") : alert('Oh no, something went wrong')
           console.log(tx, "buying success indicator")
           return tx
        }catch(e){
          console.log(e)
         alert("Sorry, something went wrong could not process the transaction")
        }
      }

      const buyingProcess = async()=>{
        try{
          const tokens = await NFTContract.walletOfOwner(contractAddress)
          console.log(tokens)
          if(tokens==null) return alert("Sorry No NFts left in the stock try again later")
          let x =  Math.floor(Math.random() * tokens.length);
          // x =  parseInt(tokens[x]._hex, 16)
          const tx = await BuyNFTToken(tokens[x]) 
          if(tx) return true
        }catch(e){
          alert("Sorry Something went wrong")
          console.log(e)
        }
        return false
      }

    

      const getCurrentPrice= async()=>{
        try{
          let balance = await SellerContract.price()
          balance =  parseInt(balance._hex, 16)
          balance = balance/1000/1000/1000/1000/1000/1000
          console.log(balance)
          return balance
        }catch(e){
          console.log(e)
        }
      }
      const getContractBalance= async()=>{
        try{
          let balance = await SellerContract.getTotalBalance()
          balance =  parseInt(balance._hex, 16)
          console.log(balance)
          return balance
        }catch(e){
          console.log(e)
        }
      }

      const changePrice= async(price)=>{
        try{
          const  p = ethers.utils.parseEther(price)
          console.log(p)
          const tx = await SellerContract.setPrice(p)
          tx.wait()
          alert("Price changed succefully")
        }catch(e){
          console.log(e)
          alert("Error changing price")
        }
      }

      // const transferToContract= async(tokenIds)=>{
      //   try{
      //     // for(let i = 0; i<tokenIds.length;i++){
      //     //   tokenIds[i]=ethers.utils.hexlify(ethers.utils.toUtf8Bytes(tokenIds[i]));
      //     //   // console.log(tokenIds[i])
      //     //   // tokenIds[i] = tokenIds[i].toString(16);
      //     // }
      //     console.log(tokenIds, "hexArray")
      //     const tx = await SellerContract.sendNFT(tokenIds)
      //     tx.wait()
      //     alert("NFTs transferred succefully")
      //   }catch(e){
      //     console.log(e)
      //     alert("Error tranferring")
      //   }
      // }


      const getN = async()=>{
        const chainId = 137 // Polygon Mainnet

        if (window.ethereum.networkVersion !== chainId) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: "0x89" }]
                });
              } catch (err) {
                  // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainName: 'Polygon Mainnet',
                        chainId: "0x89" ,
                        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                        rpcUrls: ['https://polygon-rpc.com/']
                      }
                    ]
                  });
                }
              }
            }
        
      }
    useEffect(() => {
      checkIfWalletIsConnect();
      // changeNetwork()
      getN()
    }, []);

    return(
        <EthersContext.Provider value={{connectWallet, currentAccount, checkIfWalletIsConnect , checkOwner,changeOwner,getCurrentPrice, changePrice, buyingProcess,getOwnedNFt,getContractBalance,getUserBalance}}>
          {children}
        </EthersContext.Provider>
    )
}


