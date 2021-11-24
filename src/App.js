import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {



  useEffect(() => {
    (async function () {
      await checkIfWalletIsConnected();
    })();

  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (!solana) alert("Solana object not found!");

      if (solana.isPhantom) {
        console.log('Phantom wallet found!');
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
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
