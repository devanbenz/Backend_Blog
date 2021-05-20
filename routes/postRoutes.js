const postController = require('../controllers/postController')
const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

// protect middleware will check session to make sure user is logged in before being able to run the post route
router.route('/').get(protect, postController.getAllPosts).post(protect, postController.createPost)
router.route('/:id').get(protect, postController.getOnePost).patch(protect, postController.updatePost).delete(protect, postController.deletePost)

module.exports = router