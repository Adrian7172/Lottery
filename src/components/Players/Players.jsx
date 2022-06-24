import React from "react";
import Card from "../card/Card";
import "./styles.css"
const Players = ({lotteryPot}) => {
  return <div className="players">
     <div className="main__left">
      <h2 className="left__heading marginbottom">Pot Balance</h2>
    <Card pot={lotteryPot}/>
      
    </div>
    <div className="main__right"> 
    <h2 className="left__heading marginbottom">Players join the Lottery(1)</h2>
    <Card pot = {null} />
      </div>
  </div>;
};

export default Players;
