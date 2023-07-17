const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const SimpleStorage1= artifacts.require('SimpleStorage1');

module.exports = async function (deployer) {

 const instance = await deployProxy(SimpleStorage1, [3], { deployer, initializer: 'set' });

 console.log('Deployed', instance.address)

};
