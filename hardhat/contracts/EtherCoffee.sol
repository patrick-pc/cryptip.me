// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract EtherCoffee {
    uint256 private constant PRICE = 1000000000000000000;

    constructor() {
        console.log("\n gm");
    }

    function getPrice() public pure returns (uint256) {
        return PRICE;
    }
}
