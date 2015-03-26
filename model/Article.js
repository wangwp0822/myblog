/**
 * Created by mm on 2015/3/24.
 */
var mongoose = require('../db/mongdb');
var crypto = require('crypto');


module.exports = Article;

//声明userSchema,用来定义collection的名字和里面文档的存储结构
var articleSchema = new mongoose.Schema({
                                            topic: String,
                                            content: String,
                                            label1: String,
                                            label2: String,
                                            label3: String,
                                            createTime: String,
                                            updateTime: String,
                                            comment: String
                                        }, {collection: 'article'});

//定义模型，它用来执行与数据库的操作
var articleModel = mongoose.model('Article', articleSchema);

function Article(article) {
    this.topic = article.topic;
    this.content = article.content;
};

//保存用户
Article.prototype.save = function (callback) {

    var newArticle = new articleModel({
                                          topic: this.topic,
                                          content: this.content,
                                          label1: this.label1,
                                          label2: this.label2,
                                          label3: this.label3,
                                          createTime: new Date(),
                                          updateTime: new Date(),
                                          comment: this.comment
                                      });

    newArticle.save(function (err, article) {
        if (!!err) {
            callback(err);
        } else {
            callback(null, article);
        }
    })
};

//获取单个用户
Article.get = function (username, callback) {
    articleModel.findOne({username: username}, function (err, article) {
        if (err) {
            return callback(err);
        }
        else {
            callback(null, article);
        }
    });
};

//获取单个用户
Article.get = function (username, callback) {
    articleModel.findAndModify({username: username}, function (err, article) {
        if (err) {
            return callback(err);
        }
        else {
            callback(null, article);
        }
    });
};