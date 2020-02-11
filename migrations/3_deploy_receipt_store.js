const ReceiptStore = artifacts.require("ReceiptStore");
module.exports = function(deployer) {
    
  deployer.deploy(ReceiptStore);
}