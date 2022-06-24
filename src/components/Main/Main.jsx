import "./styles.css"

const Main = ({purchaseLotteryHandler, pickWinnerHandler}) => {
  return <div className="main">
    <div className="main__left">
      <h2 className="left__heading">Want to play? click on the purchase button bellow </h2>
      <button onClick= {purchaseLotteryHandler}className="left__button">Purchase</button>
    
    </div>
    <div className="main__right"> 
    <h2 className="left__heading margin--bottom">Pick the winner (Admin only)</h2>
      <button onClick = {pickWinnerHandler}className="left__button">Pick Winner</button></div>
  </div>;
};

export default Main;
