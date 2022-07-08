var Web3 = require('web3'); 
require('dotenv').config();

// On recup notre provider : Node Infura
// Dans nos FrontApp on recuperera le provider qui est fournit par Metamask.
// L'extension nous fait la passerelle entre notre Front et un node Infura (donc la BC)
var web3 = new Web3(new  Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`));

// On recup une transaction : recup aléatoirement depuis etherscan
var ethTx = ('0xe150374de27c60049958159bf0c7f5857ba1db5c23e71e89f33852e2baaf4c7f');

// On recup les infos de la transaction
//* https://web3js.readthedocs.io/en/v1.7.4/web3-eth.html?highlight=getTransaction#gettransaction
web3.eth.getTransaction(ethTx, function(err, result) { 
    if (!err  &&  result !==  null) {
        console.log(result); // Log all the transaction info
        console.log('From Address: ' +  result.from); // Log the from address
        console.log('To Address: ' +  result.to); // Log the to address
        console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it
    } else {
        console.log('Error!', err); // Dump errors here
    }
});
