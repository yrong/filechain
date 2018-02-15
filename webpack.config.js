const webpack_config = require('webpack-builder-advanced')

let entry = {server:'./app.js'}
const packages = [
    {from:'public',to:'public'}
]

module.exports = webpack_config(entry,packages)




