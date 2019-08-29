const express = require('express');
const articleRouter = express.Router();
const articles = require('../db/articles');

//localhost:8080/articles
articleRouter.get('/', (req, res) => {
    let responseObj = articles.getArticles();
    res.render('index', { articles: responseObj, type: 'Articles', product: false });
});
articleRouter.get('/new', (req, res) => {
    res.render('new', { product: false });
});
articleRouter.get('/:id/edit', (req, res) => {
    let rpid = req.params.id;
    let responseObj = articles.getArticleById(rpid);
    res.render('editArticle', responseObj);
});
articleRouter.get('/:id', (req, res) => {
    let rpid = req.params.id;
    let responseObj = articles.getArticleById(rpid, res);
    if (responseObj === false) {
        res.render('404', { type: 'articles' });
    } else {
        responseObj.type = 'Article';
        responseObj.product = false;
        res.render('singles', responseObj);
    }
});
articleRouter.post('/', (req, res) => {
    let responseObj = articles.addArticles(req.body);
    if (typeof responseObj === 'boolean' && responseObj === false) {
        res.render('error', { type: 'articles' });
    } else {
        res.redirect('/articles');
    }
});
articleRouter.put('/:id/edit', (req, res) => {
    let rpid = req.params.id;
    articles.editArticle(rpid, req.body, res);
    res.redirect(`/articles/${rpid}`);
});
articleRouter.delete('/:id', (req, res) => {
    let rpid = req.params.id;
    articles.deleteArticle(rpid, res);
    res.redirect('/articles');
});
module.exports = articleRouter;