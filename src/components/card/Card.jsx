import React from "react";
import "./styles.css"
const Card = ({pot, player= null}) => {
  return (
  <div className="card">
    {pot !== null &&(pot=== undefined || pot == 0? "No one applied for lottery": `${pot} Ether`)}
    {player ? <a href={`https://rinkeby.etherscan.io/address/${player}`} target="_blank">{player}</a>: null}
  </div>);
};

export default Card;
