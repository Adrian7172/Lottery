import "./styles.css";
import { BiRightArrowCircle } from "react-icons/bi";

const Intro = (onClick) => {
  return (
    <section className="intro">
      <div className="intro__text">
        <h1 className="intro__heading">
          <span>Home</span> to the world's best web3 <span>Lottery App</span>
        </h1>
        <p className="intro__subheading">
          winLOTTERY is the world's best secured web3 application. Purpose of
          this application is to provide best web3 experience to the user. User
          needs to connect the metamask wallet to purchase the lottery.
        </p>
        <span className="intro__button" onClick={onClick}>
          <p>Try your luck with us</p>{" "}
          <BiRightArrowCircle className="intro__icon" />
        </span>
      </div>
    </section>
  );
};

export default Intro;
