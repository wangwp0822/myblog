var express = require('express');
var router = express.Router();
var User = require('../model/User');
var crypto = require('crypto');

module.exports = router;
//注册
router.get('/reg', function (req, res, next) {
    res.render('user/reg');
});

router.post('/reg', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var password_repeat = req.body['password_repeat'];
    if (!username) {
        req.flash('error', '用户名不能为空');
        return res.redirect('back');
    }
    if (!password || password != password_repeat) {
        req.flash('error', '两次输入密码不一致，请重新输入！');
    }
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    var newUser = new User({
                               username: username,
                               password: password,
                               email: email
                           });
    User.get(username, function (err, user) {
        if (!!err) {
            req.flash('error', '查询出错');
            return res.redirect('back');
        } else {
            if (!!user) {
                req.flash('error', '用户名存在，请重新输入');
                return res.redirect('back');
            } else {
                newUser.save(function (err, user) {
                    if (!!err) {
                        req.flash('error', '注册失败');
                        return res.redirect('back');
                    } else {
                        req.session.user = user;
                        req.flash('success', '注册成功,欢迎' + user.username + '光临');
                        res.redirect('/');
                    }

                });
            }
        }
    });
});
//登录

router.get('/login', function (req, res, next) {
    res.render('user/login');
});

router.post('/login', function (req, res, next) {
    var password = crypto.createHash('md5').update(req.body.password).digest('hex');
    User.get(req.body.username, function (err, user) {

        if (!!err) {
            req.flash('error', '查询出错！');
            return res.redirect('back');
        } else {
            if (!!user) {
                if (user.password != password) {
                    req.flash('error', '登陆密码错误');
                    return res.redirect('back');
                } else {
                    req.session.user = user;
                    req.flash('success', '注册成功，欢迎' + req.session.username + "光临");
                    res.redirect('/');
                }
            } else {
                req.flash('error', '用户名不存在,请重新输入');
                return res.redirect('back');
            }
        }
    });
});

//退出
router.get('/logout', function (req, res, next) {
    req.session.user = null;
    req.flash('success', '退出成功！');
    res.redirect('/');
})


