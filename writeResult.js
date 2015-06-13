var fs = require('fs');
var config = require('./config').config;
var articleUrlFile = config.articleurlFile;
var author = config.author;
var authorFile = config.authorFile;
var casper = require('casper').create({
    clientScripts:  [
        articleUrlFile
        ]
    });

casper.start();
casper.thenOpen('http://chengde.dadajt.com/', function() {
    var arr = [];
    arr = this.evaluate(function() {
        return arr;
    });
    getResult(arr);
});
casper.run();
function getResult(arr) {

    for(var i = 0; i < arr.length; i++) {
        if(arr[i]) {
            casper.thenOpen(arr[i], function() {
                allLinks = this.evaluate(function() {
                    var h1s = document.querySelectorAll('.message_detail h1');
                    var h2s = document.querySelectorAll('.message_detail h2');
                    var authors = document.querySelectorAll('.message_detail')[0].innerText;
                    var reg = /王帅/gm;
                    var len = authors.length;
                    var arr = [];
                    for(var i = 0; i < h1s.length; i++) {
                        if(reg.test(authors)) {
                            arr.push(location.href  + '  ' + h1s[i].innerHTML + '  ' + h2s[i].innerHTML  + '  ' + '王帅' );
                        }

                    }
                    return arr;
                });
                if(allLinks.length > 0) {
                    console.log(allLinks.join('\n'));
                    var f = fs.open(authorFile, 'a+');
                    f.writeLine(allLinks.join('\r'));
                    f.close();
                }
            });
        }

    }
}


