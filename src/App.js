import React, { useState , useEffect} from "react";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main/Main";
import Players from "./components/Players/Players";
import History from "./components/History/History";
import Web3 from 'web3/dist/web3.min.js'
import Footer from "./components/Footer/Footer";

import lotteryContract from './blockchain/lottery'



function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [lcContract, setLcContract] = useState();
  const [lotteryPot, setLotteryPot] = useState()


  useEffect(() =>{
    if(lcContract) getPot()
  }, [lcContract, lotteryPot])

  const getPot = async () =>{
    const pot = await lcContract.methods.getContractBalance().call()
    setLotteryPot(pot)
  }

  const connectWallet = async () => {
    //checking metamask is installed or not
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        //request for the wallet connection
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setAccount(account);
        alert("Account connected");

        //creating web3 instance 
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        //create localContract copy
        const lc = lotteryContract(web3);
        setLcContract(lc);
        
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("Please install MetaMask extensions in your browser.");
    }
  };
  return (
    <div className="app">
      <Navbar onClick={connectWallet}  account={account} />
      <Intro onClick={connectWallet} />
      <Main />
      <Players lotteryPot = {lotteryPot}/>
      <History />
      <Footer />
    </div>
  );
}

export default App;

