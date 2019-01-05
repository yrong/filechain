# filechain

blockchain demo project based on ipfs and ethereum

## Requirements

* npm > v5.3.0
* node > v8.3.0

## Installation

### Installing Ganache and IPFS

Install [ganache](http://truffleframework.com/ganache)


Install [ipfs](https://ipfs.io)

#### Taking Ganache online
In a new command shell run

```
./ganache-1.1.0-beta.0-x86_64.AppImage
```

This starts ganache and creates ten test accounts.


#### Taking IPFS online

```
ipfs daemon
```


### Installing the application

In a new command shell clone the repository and install dependency

```
git clone *.git&&yarn install
```

#### Deploying the application contracts

* truffle configuration(truffle.js)

```
module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 7545, //match ganache ip and port
            network_id: "*" // Match any network id
        }
    }
};
```

* From a new command shell window change to the directory and type

```
truffle compile&&truffle migrate
```

This command runs the deployment scripts in the migrations folder. The contracts are mined into the blockchain


#### Configuration

```
git clone https://github.com/yrong/config ../config
ln -s ../config .
```

- configuration

```
  "ipfs":{
    "api_host": "localhost",
    "api_port": 5001,
    "gateway_port":8080  //match ipfs host and port
  },
  "web3":{
    "host": "localhost",
    "port": 7545,
    "account_address":"0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "publish_contract_address": "0x345ca3e014aaf5dca488057592ee47305d9b3e10",//match account and contract address in ganache
    "publish_contract_gas_limit": 300000
  },
  "upload": {
      "filechain":{ // upload url as /api/upload/filechain
        "provider": "fc"
      }
    }
```

#### Deploying Auth as dependency

[redis-jwt-token-auth](https://github.com/yrong/redis-jwt-token-auth)

#### Starting the application

The application may now be started.

```
source ../config/.env&&source .env&&node app.js
```

#### Interface&Test

import test/filechain.postman_collection.json into postman

