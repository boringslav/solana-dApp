import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);


  useEffect(() => {
    (async function () {
      await checkIfWalletIsConnected();
    })();

  }, []);

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

  const renderNotConnectedButton = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );




  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedButton()}
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
