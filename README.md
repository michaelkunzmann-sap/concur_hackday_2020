# concur_hackday_2020

## Project setup

1. Node.js 12.15.0 (```nvm use```)
2. Install dependencies using```yarn```
3. Install Ganache (fake Ethereum), https://www.trufflesuite.com/ganache 
4. Run ```yarn run truffle migrate```
5. Check out HelloWorld example & tests
6. Run tests using ```yarn run truffle test```
7. Start hacking!

## Deploy to public Blockchain

To deploy to public Rinkeby test network, run ```yarn run truffle migrate --network rinkeby```

## Connect application to deployed contract

Use https://github.com/ethereum/web3.js/ library

Connection to Blockchain via the public infura API:

```
const Web3 = require("web3")
 
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID"))
```

Check Web3.js API to interact with contract on chain: https://web3js.readthedocs.io/en/v1.2.6/
