import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);


  useEffect(() => {
    (async function () {
      await checkIfWalletIsConnected();
    })();

  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
    }
    //call Solana program here

    setGifList(TEST_GIFS);
  })

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (!solana) alert("Solana object not found!");

      if (solana.isPhantom) {
        console.log('Phantom wallet found!');
      }

      const response = await solana.connect({ onlyIfTrusted: true });
      console.log('Connected with public key: ', response.publicKey.toString());

      setWalletAddress(response.publicKey.toString());

    } catch (error) {
      console.error(error);
    }
  }
  const connectWallet = async () => {
    const { solana } = window;
    if (!solana) return;
    const response = await solana.connect();
    console.log('Connected with public key: ', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }

  const sendGif = async () => {
    if (inputValue.length) {
      console.log('Gif link:', inputValue)
    } else {
      console.log('Empty input. Try again.');
    }
    setInputValue('');
  }

  const renderNotConnectedButton = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  }

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input value={inputValue} onChange={onInputChange} type="text" placeholder="Enter gif link!" />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      <div className="connected-container">
        <div className="gif-grid">
          {gifList.map(gif => (
            <div className="gif-item" key={gif}>
              <img src={gif} alt={gif} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );



  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {walletAddress ? renderConnectedContainer() : renderNotConnectedButton()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
