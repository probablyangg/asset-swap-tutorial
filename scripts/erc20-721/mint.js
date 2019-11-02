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

async function mint () {
    await CHE.methods.mint(config.amount).send({
        from: wallet[0].address,
        gas: 6721975
    }).then((receipt) => {
        console.log ("erc20 mint\t" + receipt.transactionHash)
    }, err => {
        console.log (err)
    })

    await NFT.methods.mint(config.tokenid).send({
        from: wallet[1].address,
        gas: 6721975
    }).then((receipt) => {
        console.log ("erc721 mint\t" + receipt.transactionHash)
    }, err => {
        console.log ("error: the most probable cause is the token in already minted. ")
    })
}

mint ()