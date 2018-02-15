/**
 * initialize log
 */
const LOGGER = require('log4js_wrapper')
const config = require('config')
LOGGER.initialize(config.get('logger'))
const logger = LOGGER.getLogger()

const _ = require('lodash')
const Koa = require('koa')
const statics = require('koa-static')
const convert = require('koa-convert')
const mount = require('koa-mount')
const cors = require('kcors')
const file_uploader = require('koa-file-upload-all-in-one')
const bodyParser = require('koa-bodyparser')
const check_token = require('scirichon-token-checker')
const responseWrapper = require('scirichon-response-wrapper')
const routes = require('./route')
const fs = require('fs')

/**
 * middlewares
 */
const app = new Koa()
app.use(cors({ credentials: false }))
app.use(bodyParser())
app.use(convert(statics((process.env['RUNTIME_PATH']||'../runtime'))))
app.use(convert(statics('./public')))
app.use(check_token({check_token_url:`http://${config.get('privateIP')||'localhost'}:${config.get('auth.port')}/auth/check`}))
const upload_config = config.get('runtime_data.upload')
for(let key of _.keys(upload_config)){
    let option = _.clone(upload_config[key])
    option.url = `/api/upload/${key}`
    if(option.provider==='local')
        option.folder = (process.env['RUNTIME_PATH']||'../runtime') + option.urlPath
    else if(option.provider==='nc'){
        option.nc_host = config.get('nextcloud.host')
        option.nc_admin_user = config.get('nextcloud.adminuser')
        option.nc_admin_password = config.get('nextcloud.password')
    }
    else if(option.provider==='fc'){
        option.ipfs = config.get('ipfs')
        option.web3 = config.get('web3')
        option.contract = JSON.parse(fs.readFileSync('./build/contracts/SimpleStorage.json', 'utf8'))
    }
    app.use(mount(option.url,file_uploader(option).handler))
}
app.use(responseWrapper())
app.use(routes.routes())


app.listen(config.get('filechain.port'), e => console.log(e || `server start`))


process.on('uncaughtException', (err) => {
    logger.error(`Caught exception: ${err}`)
})
