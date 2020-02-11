const Web3 = require('web3'); // Ethereum client library
const HDWalletProvider = require('truffle-hdwallet-provider'); // Helps with private key management
const HelloWorld = require('./build/contracts/HelloWorld.json'); // Containts information about compiled & deployed contract

// global configuratio parameters
const accountAddress = '0xC38995a435d3A7DD6c5D7641AD6aEb197446c1b2';
const mnemonic = 'idle belt cliff rough reward forest talent coffee bread describe legal fork';
const endpoint = 'https://rinkeby.infura.io/v3/89bfd3b41c1149299bf6405b66596179';

// init web3.js library 
const provider = new HDWalletProvider(mnemonic, endpoint);
const web3 = new Web3(provider);

// run script
(async () => {
    try {
        // Create object handle to existing contract
        const abi = HelloWorld.abi; // helps web3.js to create contract object
        const contractAddress = HelloWorld.networks['4'].address; // get address of contract that is deployed on network 4
        const contract = new web3.eth.Contract(abi, contractAddress); // init contract object

        // now, we can call contract functions from JavaScript! :)

        // read message
        const currentMessage = await contract.methods.getMessage().call();
        console.log('current message', currentMessage);

        // change value
        console.log('changing message... (can take up to 15 seconds)');
        await contract.methods.setMessage("new message with random number: " + Math.random()).send({ from: accountAddress })

        // read message again
        const newMessage = await contract.methods.getMessage().call();
        console.log('new message:', newMessage);
    } catch (err) {
        console.error(err);
    }
})().then(() => {
    console.log('done');
});
