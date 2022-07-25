// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ChainLinkTest {

  AggregatorV3Interface internal priceFeed;

  /**
  * Network: Kovan
  * Aggregator: BNB/USD
  * Address: 0x8993ED705cdf5e84D0a3B754b5Ee0e1783fcdF16
  * https://docs.chain.link/docs/ethereum-addresses/#Kovan%20Testnet

  * Ici on va faire appel au Data Feeds ChainLink pour recup le taux de change BNB / USD
  * Ce rate est donné via un contrat, on a donc besoin de recup l'adress de ce dernier pour l'intéroger grace à l'AggregatorV3Interface
  * Lors du déploiement de ce contrat, on vient recup le taux de change.

  * Contract Kovan's address : 0x7bd43F22167B7f066eeA06b80d992957EdBB413a
  */
  constructor() { 
    priceFeed = AggregatorV3Interface(0x8993ED705cdf5e84D0a3B754b5Ee0e1783fcdF16 ); 
  }

  /**
  * Returns the latest price
  */
  function getLatestPrice() public view returns (int) {
    (/*uint80 roundID*/, int price, /*uint startedAt*/,  /*uint timeStamp*/, /*uint80 answeredInRound*/) = priceFeed.latestRoundData();                 

    return price;
  }
}