const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const SimpleStorage1= artifacts.require('SimpleStorage1');
const SimpleStorage2= artifacts.require('SimpleStorage2');

module.exports = async function (deployer) {

  const existing = await SimpleStorage1.deployed();

  const instance = await upgradeProxy(existing.address, SimpleStorage2, { deployer });
 
  console.log("Upgraded", instance.address);
 

};
