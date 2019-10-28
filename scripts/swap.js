const sigUtils = require('./marketplaceUtils')
const Web3 = require('web3');
var web3 = new Web3("http://127.0.0.1:8545");
const config = require ('./config.js')

const marketplace = require ('../build/contracts/Marketplace.json');

const orderId = config.orderId;
const token1 = config.erc20;
const token2 = config.erc721;

const privateKey1 = config.privateKey1;
const privateKey2 = config.privateKey2;
// const privateKey3 = config.privateKey3;

const amount1 = config.amount;
const amount2 = config.tokenid;

web3.eth.accounts.wallet.add (privateKey1);
web3.eth.accounts.wallet.add (privateKey2);
// web3.eth.accounts.wallet.add (privateKey3);

const address1 = web3.eth.accounts.wallet[0].address;
const address2 = web3.eth.accounts.wallet[1].address;
// const address3 = web3.eth.accounts.wallet[2].address;

const marketplaceAddress = config.marketplace;
const Marketplace = new web3.eth.Contract (marketplace.abi, marketplaceAddress)


const expiration = 0 

function encode(token, sig, tokenIdOrAmount) {
    return web3.eth.abi.encodeParameters(
      ['address', 'bytes', 'uint256'],
      [token, sig, '0x' + tokenIdOrAmount.toString(16)]
    )
}
  
const obj1 = sigUtils.getSig({
    privateKey: privateKey1,
    spender: marketplaceAddress,
    orderId: orderId,
    expiration: expiration,

    token1: token1,
    amount1: amount1,
    token2: token2,
    amount2: amount2
})

const obj2 = sigUtils.getSig({
    privateKey: privateKey2,
    spender: marketplaceAddress,
    orderId: orderId,
    expiration: expiration,

    token2: token1,
    amount2: amount1,
    token1: token2,
    amount1: amount2
})

Marketplace.methods.executeOrder(
    encode(token1, obj1.sig, amount1),
    encode(token2, obj2.sig, amount2),
    orderId,
    expiration,
    address2
).send({
    from: address1, // can be called from any address (as long as the signatures are authentic)
    gas: 6721975
}).then(console.log)
