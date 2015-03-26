/**
 * Created by mm on 2015/3/24.
 */
var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
module.exports = router;
//发表文章
router.get('/add', function (req, res, next) {
    res.render('article/add');
});
router.post('/add', function (req, res, next) {
    var topic = req.body.topic;
    var content = req.body.content;
    if (!topic) {
        req.flash('error', '发表主题不能为空');
        return res.redirect('back');
    }
    if (!content) {
        req.flash('error', '发表内容不能为空！');
    }
    var newArticle = new Article({
                                     topic: topic,
                                     content: content
                                 });

    newArticle.save(function (err, article) {
        if (!!err) {
            req.flash('error', '发表失败');
            return res.redirect('back');
        } else {
            res.redirect('/article/list');
        }

    });
});
router.get('/list', function (req, res, next) {
    res.render('article/list');
});

router.post('/list', function (req, res, next) {
    res.render('article/list');
});

