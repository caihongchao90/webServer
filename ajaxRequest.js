//服务器启动后，用axios请求，并得到反馈
const axios = require('axios').default;
//插入数据
let create_ =[
    {
        username: 'caihongchao',
        password: "thioklfgbl;89234",
        email: "2268878167@qq.com",
        prince: 33.456575648678,
    },
    {
        username: 'admin000',
        password: "yuikghfdv",
        email:"liuchangqing@gmail.com"
    }
]

axios.post('http://localhost:3000/create', create_).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.log(error);
});

//删除数据
let delete_ = {
    username: 'admin888',
}
// axios.post('http://localhost:3000/delete', delete_).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.log(error);
// });

//更新数据
let updata_ = [
    {
        username: 'admin0220',
    },
    {
        username: 'admin0220',
        prince:788.882
    },
]
// axios.post('http://localhost:3000/updata', updata_).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.log(error);
// });

//查询数据
let query_ = {
    username: 'admin123'
}
// axios.post('http://localhost:3000/query', query_).then(function (response) {
//     console.log(response.data[0]);
// }).catch(function (error) {
//     console.log(error);
// });