import React from "react";
import Card from "../card/Card";
import "./styles.css"
const Players = ({lotteryPot, players}) => {
  // console.log(players)
  return <div className="players">
     <div className="main__left">
      <h2 className="left__heading marginbottom">Pot Balance</h2>
    <Card pot={lotteryPot} player = {undefined}/>
      
    </div>
    <div className="main__right"> 
    <h2 className="left__heading marginbottom">Players join the Lottery({players.length})</h2>
    {(players&& players.length > 0) ?players.map((player, index) =>{
      return<Card key={index}pot = {null} player = {player} />

    }): <h2 className="main__right__subtext">No player applied for the lottery</h2>}
      </div>
  </div>;
};

export default Players;
