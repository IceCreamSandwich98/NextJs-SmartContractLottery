# Smart Contract Lottery

## Description

My goal for this project was that I wanted to demonstrate everything i have learned to far on the back-end. I build this to help refine my solidity and js skills, get me more comfortable with troubleshooting, as well as becomming more knowledgeable with the set up of solidity projects. Some examples of what i've learned was the importiance of building strong and thorough tests and deployment scripts, as well as being able to artifically access on chain contracts via mocks. 

## Installation

1.) copy repository from github <br></br>
2.) install dependencies
```
yarn
```
```
yarn add --dev hardhat
```
```
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv
```

3. add needed information in .env 
4. yarn hardhat compile to make sure everything works correctly

The only requirement from the user is to have a web3 wallet connected to a hardhat local host chain id with ethereum.

On the dev end, I must spin up a fake hardhat blockchain, and double check the website is up and running. 

After this, all the user needs to do is click "enter raffle" button and deposite hardhat eth.
  

## License

MIT

