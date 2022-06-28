export const CONTRACT_ADDRESS = '0xA9453F980C0C7a9b56f8347D4c4532869f119b01'
export const ABI = [
  {
    inputs: [],
    name: 'CrypTip__NoTips',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CrypTip__ValueMustBeAboveZero',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
    ],
    name: 'Tip',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'walletAddress',
        type: 'address',
      },
    ],
    name: 'getTipBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
    ],
    name: 'sendTip',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawTips',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
