var fs = require('fs');
var config = require('./config').config;
var casper = require('casper').create();
var allLinks = [];
var articleUrlFile = config.articleurlFile;
var pageUrl = config.pageUrl;
var pageSize = config.pageSize;
casper.start();

var f = fs.open(articleUrlFile, 'a+');
f.writeLine('var arr = [');
f.close();
for(var i = 1; i <= pageSize; i++) {
    casper.thenOpen(pageUrl.replace(/%s/, i), function() {
        allLinks = this.evaluate(function(flag) {

            var links = document.querySelectorAll('.message_list a');
            var arr = [];
            for(var i = 0; i < links.length; i++) {
                arr.push('"' + links[i].href + '",');
            }
            return arr;
        });

        // console.log(allLinks.join('\r'));
        // TODO var f = fs.open(articleUrlFileFile, 'w+');
        // console.log(i);
        var f = fs.open(articleUrlFile, 'a+');
        f.writeLine(allLinks.join('\n'));
        f.close();
    });
}



casper.run(
    function() {
        var f = fs.open(articleUrlFile, 'a+');
        f.writeLine('""');
        f.writeLine('];');
        f.close();
        this.exit();
    }
);