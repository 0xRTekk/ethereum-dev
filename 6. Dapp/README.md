# Dapp

On va utiliser la lib web3js pour pouvoir intéragir avec la BC depuis notre App front.

```sh
npm install web3 dotenv @truffle/hdwallet-provider
```

On a besoin de renseigner notre provider de noeud infura car on va passer par ce dernier pour se "connecter" à la BC. Pour ça on renseigne notre Id Infura. On passe par un fichier `.env` pour plus de sécurité. On n'oublie pas de le ``.gitignore`` !

## Web3 JS

C'est [la librairie](https://web3js.readthedocs.io/en/v1.7.4/index.html) qu'on va utiliser pour communiquer avec la BC depuis notre Front !  
On commence par passer pas un HDWalletProvider pour simuler notre wallet Metamask qui passera par notre node Infura.  
Après on recuperera les infos directement du Metamask installé sur le navigateur

```js
// IMPORTS
const Web3 = require('web3');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

// INIT
const provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`);
const web3 = new Web3(provider);


//================
//================

// On recup une transaction : recup aléatoirement depuis etherscan
var ethTx = ('0xe150374de27c60049958159bf0c7f5857ba1db5c23e71e89f33852e2baaf4c7f');
// Lire une transaction
web3.eth.getTransaction(ethTx, (err, result) => { 
    if (!err  &&  result !==  null) {
        console.log(result);
        // Convertion de WEI vers ETHER
        console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether')));
    } else {
        console.log('Error!', err);
    }
});

//================
//================

// Pour instancier un contrat on a besoin de son adress et son abi
const Contract = new  web3.eth.Contract(abi, addr);
// On execute la fonciont retrieve du contrat. On log la réponse 
Contract.methods.retrieve().call().then(console.log);
// Quand on veut écrire sur la BC, il faut await ! 
await Contract.methods.store(5).send({
    from: '0x47db4b31eA46F9eAB135382672452f4C1a1014Fe'
});

//================
//================

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
```
