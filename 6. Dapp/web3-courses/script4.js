require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`);
web3 = new Web3(provider);

async function main() {
    const abi = [
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const addr = "0x003b0eE8a4C603017A6B7dD6e209b3eEd5f803EE";

    const Contract = new web3.eth.Contract(abi, addr);

    Contract.methods.retrieve().call().then(console.log);
    // Quand on veut écrire sur la BC, il faut await ! 
    await Contract.methods.store(5).send({
        from: '0x47db4b31eA46F9eAB135382672452f4C1a1014Fe'
    });
    Contract.methods.retrieve().call().then(console.log);
}

main();