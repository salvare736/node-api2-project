// implement your posts router here
const router = require('express').Router();
const Posts = require('./posts-model');

router.get('/http://localhost:4001/api/posts/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The comments information could not be retrieved'
            });
        });
});

router.get('/http://localhost:4001/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The post information could not be retrieved'
            });
        });
});

router.get('/http://localhost:4001/api/posts', (req, res) => {
    Posts.find()
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            });
        });
});

router.post('/http://localhost:4001/api/posts', (req, res) => {
    Posts.insert(req.body)
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            });
        });
});

router.delete('/http://localhost:4001/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The post could not be removed'
            });
        });
});

router.put('/http://localhost:4001/api/posts/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
        .then()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The post information could not be modified'
            });
        });
});

module.exports = router;
