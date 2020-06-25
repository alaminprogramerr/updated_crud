const express=require('express')
const app=express()
const PORT=process.env.PORT||5000
const mongoos=require('mongoose')
const userRouter=require('./router/userRouter')
const bodyParser=require('body-parser')
const cors =require('cors')
const { default: Axios } = require('axios')
const userModel = require('./model/userModel')
const postModel = require('./model/postsModel')
const postRouter =require('./router/postRouter')


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const storeDataFromAPI=()=>{
    Axios.get('https://feed2json.org/convert?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FPersonalTech.xml')
    .then(res=>{
        res.data.items.map(single=>{
            postModel.find()
            .then(allPost=>{
                if(allPost.length<=52){
                    new postModel({
                        // guid:single.guid,
                        // url:single.url,   
                        title:single.title,
                        // content_html:single.content_html,
                        summary:single.summary,
                        date_published:single.date_published,
                        author:single.author.name
                    })
                    .save()
                    .then(imported=>{
                        // console.log('')
                    })  
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
    Axios.get('https://feed2json.org/convert?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FTechnology.xml')
    .then(res=>{
        res.data.items.map(single=>{
            postModel.find()
            .then(allPost=>{
                if(allPost.length<=52){
                    new postModel({
                        // guid:single.guid,
                        // url:single.url,   
                        title:single.title,
                        // content_html:single.content_html,
                        summary:single.summary,
                        date_published:single.date_published,
                        author:single.author.name
                    })
                    .save()
                    .then(imported=>{
                        // console.log('')
                    })  
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
}


  
app.get('/posts',(req,res)=>{
    postModel.find()
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })    
})

mongoos.connect('mongodb://localhost/ivan-app',{useFindAndModify:false,useUnifiedTopology:true,useNewUrlParser:true},(err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Mongodb  connected')
}))



app.use(userRouter)
app.use(postRouter)
app.listen(PORT,()=>{
    console.log(`Server started on port `,PORT)
    storeDataFromAPI()
})
