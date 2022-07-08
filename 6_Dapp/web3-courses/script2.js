require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Initialisation du provider (wallet metamask avec node infura)
const provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`);
const web3 = new Web3(provider);

console.log('Calling Contract.....');

// https://ropsten.etherscan.io/address/0x003b0eE8a4C603017A6B7dD6e209b3eEd5f803EE#code
// Adresse du contract avec lequel on veut intéragir (ROPSTEN)
const addr = "0x003b0eE8a4C603017A6B7dD6e209b3eEd5f803EE";
// Son abi
const abi = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// Pour instancier un contrat on a besoin de son adress et son abi
const Contract = new  web3.eth.Contract(abi, addr);
console.log(Contract);

// On execute la fonciont retrieve du contrat. On log la réponse 
Contract.methods.retrieve().call().then(console.log);