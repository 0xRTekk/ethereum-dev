// SPDX-License-Identifier: MIT

// Les contrats openzeppelin ont étés installés via npm
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

pragma solidity 0.8.14;

contract SimpleStorage {
    uint data;

    function set(uint x) public {
        data = x;
    }

    function get() public view returns (uint) {
        return data;
    }
}
