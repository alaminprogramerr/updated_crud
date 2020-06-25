const mongoose =require('mongoose')
const Schema=mongoose.Schema
const postSchema=new Schema({
    // guid:String,
    // url:String,   
    title:String,
    // content_html:String,
    summary:String,
    date_published:String,
    author:String
})

const postModel=mongoose.model('postModel',postSchema)
module.exports=postModel