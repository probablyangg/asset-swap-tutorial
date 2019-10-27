var ChildERC20 = artifacts.require("ChildERC20");
var ChildERC721 = artifacts.require ("ChildERC721");
var Marketplace = artifacts.require ("Marketplace");

const owner = '0x9fB29AAc15b9A4B7F17c3385939b007540f4d791'
const token = '0x9fB29AAc15b9A4B7F17c3385939b007540f4d791'

module.exports = function(deployer) {
  deployer.deploy(ChildERC20, owner, token, "ChildERC20", "CHE", 18);
  deployer.deploy(ChildERC721, owner, token, "ChildERC721", "NFT");
  deployer.deploy(Marketplace);
};