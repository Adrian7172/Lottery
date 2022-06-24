import "./styles.css";

const Navbar = ({onClick, account}) => {
  return (
    <div className="navbar">
      <span className="logo">
        win<span>LOTTERY</span>
      </span>
      <button className="navbar__button" onClick={onClick}>{account === null ? 'Connect Wallet': "Connected"}</button>
    </div>
  );
};

export default Navbar;
