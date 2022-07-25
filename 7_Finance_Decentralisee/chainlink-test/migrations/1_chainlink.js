const ChainLinkTest = artifacts.require("ChainLinkTest");

module.exports = function (deployer) {
  deployer.deploy(ChainLinkTest);
};
