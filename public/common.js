'use strict'

let hostname = window.location.hostname, token


const apiInvoke = (url, method, data, cb) => {
    let options = {
        url: url,
        type: method,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
    }
    if (data)
        options.data = data
    $.ajax(options).done(cb)
}

const login =(cb)=>{
    apiInvoke(`http://${hostname}:3002/auth/login`, 'POST', JSON.stringify({
        "username": username,
        "password": password
    }), (res) => {
        res = res.data||res
        token = res.token
        cb(token)
    })
}