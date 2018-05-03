const querystring = require('querystring') //querystring.stringify(obj) 会把obj拼接成 key=value&a=b格式
const oldjsonp = require('jsonp')
export const jsonp = (url, params,name) => {
  const op = {
    name,
  }
  return new Promise((resolve, reject) => {
    url = url + '?' + querystring.stringify(params) //拼接url
    oldjsonp(url,op, (err, data) => {
      if (!err) {
        resolve(data)
      }
    })
  })
}
