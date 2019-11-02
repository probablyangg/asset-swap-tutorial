const Web3 = require('web3');
const config = require('./config.js')

var web3 = new Web3(config.provider);

const wallet = web3.eth.accounts.wallet;

wallet.add (config.privateKey1);
wallet.add (config.privateKey2);

const ChildERC20 = require ('../../build/contracts/ChildERC20.json');
const ChildERC721 = require ('../../build/contracts/ChildERC721.json');

const CHE = new web3.eth.Contract (ChildERC20.abi, config.erc20);
const NFT = new web3.eth.Contract (ChildERC721.abi, config.erc721);

async function displayBalance () {
    console.log ("--- erc20 balances ---")
    await CHE.methods.balanceOf(wallet[0].address).call().then((res) => {
        console.log ("balance of: \t\t" + wallet[0].address + ":\t" + res)
    })
    await CHE.methods.balanceOf(wallet[1].address).call().then((res) => {
        console.log ("balance of: \t\t" + wallet[1].address + ":\t" + res + "\n")
    })
    console.log ("--- erc721 balances ---")
    await NFT.methods.balanceOf(wallet[0].address).call().then((res) => {
        console.log ("balance of: \t\t" + wallet[0].address + ":\t" + res)
    })
    await NFT.methods.balanceOf(wallet[1].address).call().then((res) => {
        console.log ("balance of: \t\t" + wallet[1].address + ":\t" + res + "\n")
    })
    console.log ("--- NFT "+config.tokenid+" owner ---")
    await NFT.methods.ownerOf(config.tokenid).call().then((res) => {
        if (res) console.log ("owner of token id " + config.tokenid + ":\t" + res)
    }, err => {
        console.log ("error: the most probable cause is the token id has not been minted yet.")
    })
}

displayBalance ();