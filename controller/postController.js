const postModel =require('../model/postsModel')
const validator=require('../validator/customValidator')

const createPost=(req, res)=>{
    console.log(req.body)
    const verify=validator.postValidator(req)
    if(!verify.isValid){
        return res.status(400).json(verify.err)
    }
    // time create
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = mm + '-' + dd + '-' + yyyy;
        var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds();
        var time=h+":"+m+":"+s
        var fullTime=date+"T"+time+".zzz"
    
    new postModel({
        title:req.body.title,
        summary:req.body.summary,
        date_published:fullTime,
        author:req.body.author
    })
    .save()
    .then(doc=>{
        res.status(200).json({massage:'Post created!'})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"Server error occurd"})
    })

}
const editPost=(req, res)=>{
    console.log(req.params.id)
    postModel.findByIdAndUpdate(req.params.id,req.body)
    .then(updated=>{
        res.status(200).json({massage:"Updated"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"Server error"})
    })

}

const deletePost =(req,res)=>{
    postModel.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.status(200).json({massage:"Post deleted"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"Server error "})
    })
}
 const getSinglePost=(req,res)=>{
    console.log(req.params.id)
     postModel.findOne({_id:req.params.id})
     .then(doc=>{
         console.log(doc)
         res.status(200).json(doc)
     })
     .catch(err=>{
         console.log(err)
         res.status(500).json({massage:"Server error "})
     })
 }

module.exports={
    createPost,
    editPost,
    deletePost,
    getSinglePost
}