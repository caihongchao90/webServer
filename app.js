const express = require('express')
const port = 3000
const app = express()

const dataBase = require('./dataBase')  //引入即连接数据库

// app.use('/static', express.static(__dirname + '/public'));
//查询数据
app.post('/query', function (req, res) {
    let data = ""
    let sendMessage = undefined
    req.on('data',(chunk)=>{
        data += chunk
    })
    req.on('end',()=>{
        let parseData = parse(data)
        let result = dataBase.getModelData(parseData[0])
        result.then((aug)=>{
            sendMessage = aug
        })
    })
    let time = setInterval(()=>{
        if(sendMessage){
            res.send(sendMessage);
            clearInterval(time)
        }
    },1)
});
//删除数据
app.post('/delete', function (req, res) {
    let data = ""
    let sendMessage = undefined
    req.on('data',(chunk)=>{
        data += chunk
    })
    req.on('end',()=>{
        let parseData = parse(data)
        let result = dataBase.deleteModelData(parseData[0])
        result.then((aug)=>{
            sendMessage = aug
        })
    })
    let time = setInterval(()=>{
        if(sendMessage){
            res.send(sendMessage);
            clearInterval(time)
        }
    },1)
});

//插入数据
app.post('/create', function (req, res) {
    let data = ""
    let sendMessage = undefined
    req.on('data',(chunk)=>{
        data += chunk
    })
    req.on('end',()=>{
        console.log(data)
        let parseDatas = parse(data)
        console.log(parseDatas)
        let result = dataBase.createModelData(parseDatas)
        result.then((aug)=>{
            sendMessage = aug
        })
    })
    let time = setInterval(()=>{
        if(sendMessage){
            res.send(sendMessage);
            clearInterval(time)
        }
    },1)
});

//更新数据
app.post('/updata', function (req, res) {
    let data = ""
    let sendMessage = undefined
    req.on('data',(chunk)=>{
        data += chunk
    })
    req.on('end',()=>{
        let parseData = parse(data)
        let result = dataBase.updataModelData(parseData[0],parseData[1])
        result.then((aug)=>{
            sendMessage = aug
        })
    })
    let time = setInterval(()=>{
        if(sendMessage){
            res.send(sendMessage);
            clearInterval(time)
        }
    },1)
});
//解析数据
function parse(data){
    let newData = data.split('},{')
    let parseDatas = []
    newData.map(element=>{
        if(element){
            let array = element.split(',')
            let parseData = {}
            array.map((item)=>{
                if(item){
                    //如果值是数字，则parseFloat转换成数值类型，如果是字符串，则正常转
                    if(parseFloat(item.split(':')[1])){
                        parseData[item.split('":"')[0].split('"')[1]] = parseFloat(item.split(':')[1])
                    }else{
                        parseData[item.split('":"')[0].split('"')[1]] = item.split('":"')[1].split('"')[0]
                    }
                }
            })
            parseDatas.push(parseData)
        }
    })
    //数据解析完成
    return parseDatas
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
