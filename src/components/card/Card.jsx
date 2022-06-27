import React from "react";
import "./styles.css"
const Card = ({pot, player= null, address = null}) => {
  
  return (
  <div className="card">
    {pot !== null &&(pot=== undefined || pot == 0? "No one applied for lottery": `${pot} Ether`)}
    {player ? <a href={`https://rinkeby.etherscan.io/address/${player}`} target="_blank">{player}</a>: null}
    {address ?<div className="card__history"><h3 >Lottery {address.id +1} winner - </h3> <a href={`https://rinkeby.etherscan.io/address/${address.address}`} target="_blank">{address.address}</a></div> : null}
  </div>);
};

export default Card;
