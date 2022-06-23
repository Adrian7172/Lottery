import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main/Main";
// import { MetaMaskInpageProvider } from "@metamask/providers";

// import Web3 from "web3";



function App() {
  // const [web3, setWeb3] = useState();
  // const [account, setAccount] = useState();

  const connectWallet = async () => {
  //   //checking metamask is installed or not
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     try {
  //       //request for the wallet connection
  //       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const account = accounts[0];


  //       // const web3 = new Web3(window.ethereum);
  //       // setWeb3(web3);
  //     } catch (e) {
  //       if (typeof e === "string") {
  //         alert(e.toUpperCase());
  //       } else if (e instanceof Error) {
  //         alert(e.message);
  //       }
  //     }
  //   } else {
  //     alert("Please install MetaMask extensions in your browser.");
  //   }
  };
  return (
    <div className="app">
      <Navbar onClick={connectWallet} />
      <Intro onClick={connectWallet} />
      <Main />
    </div>
  );
}

export default App;

