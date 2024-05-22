const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController.js')

router.get('/articles' , articleController.findAllArticles);
router.post('/article' , articleController.createArticle);
router.get('/article' , articleController.findArticleById);
router.put('/article', articleController.updateArticle);
router.delete('/article' , articleController.deleteArticle);

module.exports = router;