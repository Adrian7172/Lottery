import "./styles.css";

const Navbar = (onClick) => {
  return (
    <div className="navbar">
      <span className="logo">
        win<span>LOTTERY</span>
      </span>
      <button className="navbar__button" onClick={onClick}>Connect Wallet</button>
    </div>
  );
};

export default Navbar;
