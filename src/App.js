import React, { useState, useEffect } from "react";
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
  const [lotteryHistory, setLotteryHistory] = useState([])
  const [historyId, setHistoryId] = useState();
  const [preId, setPreId] = useState(-1);




  useEffect(() => {

    updateState()
  }, [lcContract])


  const updateState = () => {
    getPot();
    getPlayers();
    getHistoryId();
  }



  //for getting the pot balance
  const getPot = async () => {
    const pot = await lcContract.methods.getContractBalance().call()
    setLotteryPot(web3.utils.fromWei(pot, 'ether'))
  }

  //for getting all the players join the lottery
  const getPlayers = async () => {
    const players = await lcContract.methods.getAppliedPlayers().call()
    setLotteryPlayers(players);
  }

  //purchase button
  const purchaseLotteryHandler = async () => {
    try {
      await lcContract.methods.Apply().send(
        {
          from: account,
          value: web3.utils.toWei('0.01', 'ether'),
          gas: 300000,
          gasPrice: null
        }
      )
      updateState();
      alert("purchase success");
    } catch (error) {
      alert(error.message);

    }
  }


  //pick winner 
  const pickWinnerHandler = async () => {
    try {
      await lcContract.methods.pickWinner().send(
        {
          from: account,
          gas: 300000,
          gasPrice: null
        }
      )
      const winnerAddress = lotteryHistory[historyId - 1].address;

      alert("success");
      updateState();
    } catch (error) {
      alert(error.message);
    }
  }

  //get id of the history

  const getHistoryId = async () => {

    const lotteryId = await lcContract.methods.id().call();
    setHistoryId(lotteryId);
    await getHistory(lotteryId);
  }


  // get the history of winner
  const getHistory = async (id) => {
    if(preId < parseInt(id)){
      setPreId( parseInt(id));
      setLotteryHistory([]);
    for (let i = parseInt(id) - 1; i >= 0; i--) {
      const winnerAddress = await lcContract.methods.winnersHistory(i).call()
      const historyObj = {};
      historyObj.id = i
      historyObj.address = winnerAddress;
      setLotteryHistory(lotteryHistory => [...lotteryHistory, historyObj])
    }
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
        await window.ethereum.request({ method: "eth_requestAccounts" });


        //creating web3 instance 
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);
        alert("Account connected");
        
        //create localContract copy
        const lc = lotteryContract(web3);
        setLcContract(lc);
        setPreId(-1);
        
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          setAccount(account);
        })

      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("Please install MetaMask extensions in your browser.");
    }
  };
  return (
    <div className="app">
      <Navbar onClick={connectWallet} account={account} />
      <Intro onClick={connectWallet} />
      <Main purchaseLotteryHandler={purchaseLotteryHandler} pickWinnerHandler={pickWinnerHandler} />
      <Players lotteryPot={lotteryPot} players={lotteryPlayers} />
      <History lotteryHistory={lotteryHistory} />
      <Footer />
    </div>
  );
}

export default App;

