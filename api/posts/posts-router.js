// implement your posts router here
const router = require('express').Router();
const Posts = require('./posts-model');

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if (comments.length !== 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID either does not exist, or has no comments associated with it'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The comments information could not be retrieved'
            });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The post information could not be retrieved'
            });
        });
});

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            });
        });
});

// router.post('/', (req, res) => {
//     Posts.insert(req.body)
//         .then(newPost => {
//             if (!req.body.title || !req.body.contents) {
//                 res.status(400).json({
//                     message: 'Please provide title and contents for the post'
//                 });
//             } else {
//                 Posts.findById(newPost.id)
//                     .then(createdPost => {
//                         res.status(201).json(createdPost);
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(500).json({
//                             message: 'The post information could not be retrieved'
//                         });
//                     });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 message: 'There was an error while saving the post to the database'
//             });
//         });
// });

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Posts.insert({ title, contents })
            .then(({ id }) => {
                return Posts.findById(id);
            })
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'There was an error while saving the post to the database'
                });
            });
    }
});

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(deletedPosts => {
            if (deletedPosts) {
                res.status(200).json({
                    message: `${deletedPosts} post with specified ID ${req.params.id} was deleted`
                });
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The post could not be removed'
            });
        });
});

router.put('/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
        .then(updatedPosts => {
            if (!updatedPosts) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                });
            } else {
                if (!req.body.title || !req.body.contents) {
                    res.status(400).json({
                        message: 'Please provide title and contents for the post'
                    });
                } else {
                    Posts.findById(req.params.id)
                        .then(updatedPost => {
                            res.status(200).json(updatedPost);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                message: 'The post information could not be retrieved'
                            });
                        });
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The post information could not be modified'
            });
        });
});

module.exports = router;
