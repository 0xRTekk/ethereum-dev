const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: { 
   development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 8545,            // Standard Ethereum port (default: none)
    network_id: "*",       // Any network (default: none)
   },
   rinkeby:{
    provider : function() {return new HDWalletProvider({mnemonic:{phrase:`${process.env.MNEMONIC}`},providerOrUrl:`https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`})},
    network_id:4,
  },
  kovan:{
    provider : function() {return new HDWalletProvider({mnemonic:{phrase:`${process.env.MNEMONIC}`},providerOrUrl:`https://kovan.infura.io/v3/${process.env.INFURA_ID}`})},
    network_id:42,
  },
},

plugins: ["solidity-coverage"],

mocha: {
 reporter: 'eth-gas-reporter',
  reporterOptions : { 
    gasPrice:1,
    token:'ETH',
    showTimeSpent: true,
   }
},

compilers: {
  solc: {
    version: "0.8.14",
  }
},
};