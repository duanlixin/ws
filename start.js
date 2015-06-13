var async = require('async');
var exec = require('child_process').exec;
var fs = require('fs');
var util = require('util');
var config = require('./config').config;
var DELARTICLEURL_CMD = util.format('del %s', config.articleurlFile);
var DELRESULT_CMD = util.format('del %s.txt', config.author);

async.series([
    function(callback){
        console.log('checking....');
        // 删除已有articleurl.js文件
        exec(DELARTICLEURL_CMD);
        callback(null);
    },
    function(callback){
        console.log('get article start....');
        // 抓取文章列表，写入文件
        exec( 'casperjs getArticleUrl.js', callback );
    },
    function(callback){
        console.log('get article over....');
        console.log('================================');
        // 删除已有结果
        exec(DELRESULT_CMD);
        callback(null);
    },
    function(callback){
        console.log('write result start....');
        // 匹配作者名字，写入文件
        exec( 'casperjs writeResult.js', callback );
    }
],
function(err, results) {
    console.log('done');
});