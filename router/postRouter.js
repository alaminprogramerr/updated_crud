const postRouter=require('express').Router()
const postController=require('../controller/postController')



postRouter.post('/create-post',postController.createPost)
postRouter.post('/edit-post/:id',postController.editPost)
postRouter.get('/delete-post/:id',postController.deletePost)
postRouter.get('/get-single-post/:id',postController.getSinglePost)


module.exports=postRouter