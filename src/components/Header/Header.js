import CalBetsLogo from '../../CalBetsLogo.png';
import './Header.css'

const Header = () => {
  return (
    <div style={{backgroundColor: "lightblue"}}>
      <nav>
        <div>
          <a href="/">
          <img src={CalBetsLogo} className="logo" alt="CalBets Logo"/>
          </a>
        </div>
      </nav>
    </div>
  );
};

export { Header };
