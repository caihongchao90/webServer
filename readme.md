## **mongoose用法简介**
************************************
- ### **连接数据库**
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/itcast')
```
- 创建访问数据库的前提条件
> type 字段类型
> required 确定该字段添加的时候是否 **必选** 
```javascript
//约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
})
//模型构造函数
var User = mongoose.model('User', userSchema);
```
插入数据，如果没有这张表，那就创建一张
```javascript
var Test = mongoose.model('Test', userSchema);
let Model = new Test({
    username:'小明',
    password:'123456',
    age:18
})
Model.save().then((res,err)=>{
    if(res){
        console.log('保存成功：',res);
    }else{
        console.log(err);
    }
})
```

- ###  **增加数据**
可以添加一条数据，或者添加多条数据（多条数据需要使用'[ ]'将欲添加数据放入）
> Model 模型，与MongoDB交互的主要工具
> data 插入的数据
```javascript
async function createModelData(Model,data){
    const doc = await Model.create(data)
    return doc;
}
```   

- ###  **删除数据**

> Model 模型，与MongoDB交互的主要工具
> where 查找删除数据位置的参考(只删除一条)
```javascript
async function deleteModelData(Model,where){
    const doc = await Model.deleteOne(where)
    return doc;
}
```
- ###  **更新数据**

> Model 模型，与MongoDB交互的主要工具
> where 查找更新数据位置的参考(只更新一条)
```javascript
async function updataModelData(Model,where,updata){
    const doc = await Model.updateOne(where,updata)
    return doc;
}
```
- ###  **查询数据**
1>
> Model 模型，与MongoDB交互的主要工具
> where 查找的数据位置的参考(默认返回 Model 的全部内容)
```javascript
async function getModelData(Model,where={}){
    const doc = await Model.find(where)
    return doc;
}
```
2>查询记录条数
```javascript
async function countModelData(Model,where={}){
    const doc = await Model.count(where)
    return doc;
}
```
- ##  **方法使用** 
```javascript
let data = getModelData(User,{password: 'Will Riker'}).then(data=>{
    data.map((aug)=>{
        console.log(aug)
    })
    return data
})
```