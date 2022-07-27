const ChainLinkVRF = artifacts.require("ChainLinkVRF");

let id = 9206;
module.exports = function (deployer) {
  deployer.deploy(ChainLinkVRF, id);
};
