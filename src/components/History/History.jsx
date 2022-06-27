import React from "react";
import { useEffect } from "react";
import Card from "../card/Card";
import "./styles.css"

const History = (lotteryHistory) => {
  
  // console.log(lotteryHistory)
  const History = lotteryHistory.lotteryHistory;
  console.log(History.length)
  return <div className="history">
    <h1>Lottery History</h1>
    { History.map((address) =>{
      return <Card key={address.id} pot = {null} address = {address}/>

    }) }
  </div>;
};

export default History;
