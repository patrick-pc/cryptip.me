// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error EtherCoffee__ValueMustBeAboveZero();
error EtherCoffee__NoProceeds();

/// @title Ether Coffee
/// @author web3slinger
/// @notice This contract is for creators and artists to accept support by receiving ether
contract EtherCoffee {
    /// @notice Mapping user address to proceeds
    mapping(address => uint256) private s_proceeds;

    /// @notice This event is emitted when the contract receives an ether
    /// @dev Using events to get the sender message and details using an indexing protocol
    /// @param receiver Receiver address
    /// @param sender Sender address
    /// @param amount The amount
    /// @param timestamp Transaction timestamp
    /// @param name Name of the sender
    /// @param message Message from the sender
    event CoffeeBought(
        address indexed receiver,
        address indexed sender,
        uint256 indexed amount,
        uint256 timestamp,
        string name,
        string message
    );

    /// @notice Sends ether to the contract
    /// @dev Using pull over push method
    /// @param userAddress Address that will receive the ether
    /// @param name Name of the sender
    /// @param message Message from the sender
    function buyCoffee(
        address userAddress,
        string memory name,
        string memory message
    ) public payable {
        if (msg.value <= 0) revert EtherCoffee__ValueMustBeAboveZero();

        // Could just send the money...
        // https://fravoll.github.io/solidity-patterns/pull_over_push.html
        s_proceeds[userAddress] += msg.value;
        emit CoffeeBought(userAddress, msg.sender, msg.value, block.timestamp, name, message);
    }

    /// @notice Gets the amount that an address have
    function withdrawProceeds() external {
        uint256 proceeds = s_proceeds[msg.sender];
        if (proceeds <= 0) revert EtherCoffee__NoProceeds();

        s_proceeds[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "Transfer failed");
    }

    /// @return User proceeds of this contract
    function getProceeds(address userAddress) external view returns (uint256) {
        return s_proceeds[userAddress];
    }
}
