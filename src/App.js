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
  const [account, setAccount] = useState(null);
  const [lcContract, setLcContract] = useState();
  const [lotteryPot, setLotteryPot] = useState();
  const [lotteryPlayers, setLotteryPlayers] = useState([]);
  const [update, setUpdate] = useState(false);


  useEffect(() =>{
    if(lcContract) {
      getPot();
      getPlayers();
    }
  }, [lcContract, update])

  //for getting the pot balance
  const getPot = async () =>{
    const pot = await lcContract.methods.getContractBalance().call()
    setLotteryPot(web3.utils.fromWei(pot, 'ether'))
  }
  
  //for getting all the players join the lottery
  const getPlayers = async () =>{
    const players = await lcContract.methods.getAppliedPlayers().call()
    setLotteryPlayers(players);
  }

  //purchase button
  const purchaseLotteryHandler = async() =>{
    try{
      await lcContract.methods.Apply().send(
        {
          from: account,
          value: web3.utils.toWei('0.01', 'ether'),
          gas: 300000,
          gasPrice: null
        }
      ) 
      setUpdate((pre) => !pre);
      alert("purchase success");
    }catch(error){
      alert(error.message);
    }
  }
  
  
  //pick winner 
  const pickWinnerHandler = async() =>{
    try{
      await lcContract.methods.pickWinner().send(
        {
          from: account,
          gas: 300000,
          gasPrice: null
        }
        )
        setUpdate((pre) => !pre);
        alert("success");
      }catch(error){
        alert(error.message);
    }
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
      <Main purchaseLotteryHandler={purchaseLotteryHandler} pickWinnerHandler={pickWinnerHandler}/>
      <Players lotteryPot = {lotteryPot} players = {lotteryPlayers}/>
      <History />
      <Footer />
    </div>
  );
}

export default App;

