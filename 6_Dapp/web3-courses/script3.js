const Web3 = require('web3');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`);
const web3 = new Web3(provider);

// Initialisation d'une transaction basique
const tx = {
  // Addr Alyra1 Ropsten
  from: `${process.env.ADDR1}`,
  // Addr Alyra2 Ropsten
  to: `${process.env.ADDR2}`,
  // 0.1 rETH
  value: 100000000000000000,
};

// Signe une transaction : Spécifit que la transaction est bien envoyé depuis l'adresse tx.from
const signPromise = web3.eth.signTransaction(tx, tx.from);

// web3.eth.signTransaction renvoie une Promise, on utilise donc .then() pour executer des actions une fois la promesse tenue
signPromise.then((signedTx) => {
  // On envoie la transaction signée
  const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

  // Quand elle est bien envoyée et reçu sur l'autre compte
  sentTx.on("receipt", receipt => {
    console.log("super");
  });

  // Quand elle ne passe pas
  sentTx.on("error", err => {
    console.log("oopsie");
  });

}).catch((err) => {
  console.log("oupsie2");
});