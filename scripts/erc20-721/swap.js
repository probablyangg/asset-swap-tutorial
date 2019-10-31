const sigUtils = require('./marketplaceUtils')
const Web3 = require('web3');
const config = require ('./config.js')

var web3 = new Web3(config.provider);

const wallet = web3.eth.accounts.wallet;

wallet.add (config.privateKey1);
wallet.add (config.privateKey2);

const marketplace = require ('../../build/contracts/Marketplace.json');
const Marketplace = new web3.eth.Contract (marketplace.abi, config.marketplace)

function encode(token, sig, tokenIdOrAmount) {
    return web3.eth.abi.encodeParameters(
      ['address', 'bytes', 'uint256'],
      [token, sig, '0x' + tokenIdOrAmount.toString(16)]
    )
}
  
const obj1 = sigUtils.getSig({
    privateKey: config.privateKey1,
    spender: config.marketplace,
    orderId: config.orderId,
    expiration: config.expiration,

    token1: config.erc20,
    amount1: config.amount,
    token2: config.erc721,
    amount2: config.tokenid
})

const obj2 = sigUtils.getSig({
    privateKey: config.privateKey2,
    spender: config.marketplace,
    orderId: config.orderId,
    expiration: config.expiration,

    token2: config.erc20,
    amount2: config.amount,
    token1: config.erc721,
    amount1: config.tokenid
})

Marketplace.methods.executeOrder(
    encode(obj1.tokenAddress, obj1.sig, obj1.tokenIdOrAmount),
    encode(obj2.tokenAddress, obj2.sig, obj2.tokenIdOrAmount),
    config.orderId,
    config.expiration,
    wallet[1].address
).send({
    from: wallet[1].address, // can be called from any address (as long as the signatures are authentic)
    gas: maxGas
}).on('transactionHash', function(transactionHash){ console.log("swap tx - \t" +  transactionHash) })
