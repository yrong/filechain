const config = require('config')
const fs = require('fs')
const IpfsApi = require('ipfs-api')
const Web3 = require('web3')
const truffle_contract = require('truffle-contract')

/*
 initialize
 */
const ipfs = IpfsApi({host: config.get('ipfs.api_host'), port: config.get('ipfs.api_port'), protocol: 'http'})
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.get('web3.host')}:${config.get('web3.port')}`))
const contract = truffle_contract(JSON.parse(fs.readFileSync('./build/contracts/SimpleStorage.json', 'utf8')))
contract.setProvider(web3.currentProvider)

module.exports = contract