const mongoose = require('mongoose');

let Schema = mongoose.Schema
//设计集合结构（表结构）
let userSchema = new Schema({
    username:{
        type:String,
        required:true //必须有
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    prince:{
        type:Number,
    }
})
let ploderSchema = new Schema({
    name:{
        type:String,
        required:true
    }
})
let User = mongoose.model('User', userSchema);
let Ploder = mongoose.model('Ploder', ploderSchema);
const query = User.find();  //查询数据
console.log(User,Ploder)
try{
    mongoose.connect('mongodb://localhost/itcast') //连接数据库
    console.log("数据库连接成功")
} catch(error){
    console.log("数据库连接有误，请检查数据库连接",error)
}



//增，可以加一条也可以加多条，多条时用中括号括起来。
async function createModelData(data){
    const doc = await User.create(data)
    return doc;
}
//删除
async function deleteModelData(where){
    const doc = await User.deleteOne(where)
    return doc;
}
//更新
async function updataModelData(where,updata){
    const doc = await User.updateOne(where,updata)
    return doc;
}
//查询记录条数
async function countModelData(Model,where={}){
    const doc = await Model.count(where)
    return doc;
}
//查询数据
async function getModelData(where={}){
    const doc = await User.find(where)
    // console.log(doc)
    return doc;
}
function exists(condition){
    query.where(condition).then(data=>{
        if(data.length !=0){
            console.log("查询到数据",data.length)
            return true;
        }else{
            console.log("没有找到数据")
            return false;
        }
    })
}

// let exist = exists({'username':'Will Riker'})
// deleteModelData({'username':'Will Riker',"a":"as"})
// getModelData()
// updataModelData({username: 'admin000'},{'prince':3.032498989})
module.exports = {
    createModelData,
    deleteModelData,
    updataModelData,
    countModelData,
    getModelData,
}