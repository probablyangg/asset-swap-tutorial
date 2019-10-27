const Web3 = require('web3');
var web3 = new Web3("http://127.0.0.1:8545");
const config = require('./config.js')

const privateKey1 = config.privateKey1;
const privateKey2 = config.privateKey2

web3.eth.accounts.wallet.add (privateKey1);
web3.eth.accounts.wallet.add (privateKey2);

const address1 = web3.eth.accounts.wallet[0].address;
const address2 = web3.eth.accounts.wallet[1].address;

const amount = confid.amount;
const tokenid = config.tokenid;

const ChildERC20 = require ('../build/contracts/ChildERC20.json');
const ChildERC721 = require ('../build/contracts/ChildERC721.json');

const ChildERC20Address = config.erc20;
const ChildERC721Address = config.erc721;

const CHE = new web3.eth.Contract (ChildERC20.abi, ChildERC20Address);
const NFT = new web3.eth.Contract (ChildERC721.abi, ChildERC721Address);

CHE.methods.mint(amount).send({
    from: address1,
    gas: 6721975
}).then((res) => {
    console.log (res.transactionHash)
    CHE.methods.balanceOf(address1).call().then((r) => {
        console.log ("address 1 has",r, "tokens");
    })
})

NFT.methods.mint(tokenid).send({
    from: address2,
    gas: 6721975
}).then((res) => {
    console.log (res.transactionHash)
    NFT.methods.ownerOf(tokenid).call().then((r) => {
        console.log ("address 2 is the owner of tokenID: ", r);
    })
})
