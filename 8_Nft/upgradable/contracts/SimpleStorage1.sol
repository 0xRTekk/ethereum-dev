// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract SimpleStorage1 {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function set(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function get() public view returns (uint256){
        return number;
    }
}