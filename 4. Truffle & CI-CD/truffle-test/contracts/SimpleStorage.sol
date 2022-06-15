// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
 
contract SimpleStorage {
    uint data;

    // Notre constructeur est payable : on peut envoyer des eth lors du déploiement du contrat
    // await deployer.deploy(SimpleStorage, 420, {value: 3});
    // => On envoie 3 wei lors du déploiement (fichier deploy.js)
    constructor(uint _nb) payable {
        set(_nb);
    }

    function set(uint x) public {
        data = x;
    }

    function get() public view returns (uint) {
        return data;
    }
}
