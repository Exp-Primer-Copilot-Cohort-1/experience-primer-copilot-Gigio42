// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var pathName = parsedUrl.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                res.end('404 Not Found.');
            } else {
                res.end(data);
            }
        });
    } else if (pathName === '/comments') {
        if (req.method === 'GET') {
            var data = JSON.stringify(comments);
            res.end(data);
        } else if (req.method === 'POST') {
            var str = '';
            req.on('data', function (chunk) {
                str += chunk;
            });
            req.on('end', function () {
                var comment = JSON.parse(str);
                comments.push(comment);
                res.end('ok');
            });
        }
    } else {
        fs.readFile('.' + pathName, function (err, data) {
            if (err) {
                res.end('404 Not Found.');
            } else {
                res.end(data);
            }
        });
    }
});

server.listen(8080, function () {
    console.log('Server is running...');
});
```

###