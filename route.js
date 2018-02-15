const _ = require('lodash')
const Router = require('koa-router')
const router = new Router();
const contract = require('./contract')
const config = require('config')
const contract_address = config.get('web3.publish_contract_address')
const account_address = config.get('web3.account_address')

router.get(`/api/filechain/:fileHash`, async function (ctx) {
    let simpleStorage = await contract.at(contract_address)
    let result = await simpleStorage.get(ctx.params.fileHash,{from: account_address})
    ctx.body = {fileHash:result[0],publisher:result[1],publishTime:result[2]}
})

module.exports = router