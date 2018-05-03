// querystring.stringify(obj) 会把obj拼接成 key=value&a=b格式
// 用法:
// var q = querystring.stringify(obj);
// jsonp(url + '?' + q, { timeout: 3000 }, function (err, data) {
//     if(!err){
//         return Promise.resolve(data)
//     }
//   });
//封装下:
// import oldjsonp from "jsonp";
// export const jsonp = (url, params) => {
//   oldjsonp(url + '?' + params, (err, data) => {
//     if (!err) {
//       return Promise.resolve(data)
//     }
//   })
// }
//！！！ref是非响应式的!!!!也就是说只能绑定根节点，不能和用数据生成的dom绑定