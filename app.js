/**
 * Created by dileepkumar on 5/25/17.
 */
const express = require('express');
const app = express();
const options = {
    root: __dirname+'/dist'
}
app.use(express.static('dist'));

app.get('/', function(req, res, next) {
    res.sendFile('index.html',options)
});


app.get('/images', function (req, res) {
    const password = req.params.password;

    res.setHeader('Content-Type', 'application/json');
    res.send([{
        title: 'First Block',
        images: ['test1.jpeg',
            'test12.jpeg',
            'test13.jpeg',
            'test14.jpeg']
    }, {
        title: 'Second Block',
        images: ['test5.jpeg',
            'test6.jpeg',
            'test7.jpeg',
            'test8.jpeg']
    }, {
        title: 'Third Block',
        images: ['test9.jpeg',
            'test10.jpeg',
            'test11.jpeg',
            'test12.jpeg']
    }, {
        title: 'Fourth Block',
        images: ['test13.jpeg',
            'test14.jpeg',
            'test15.jpeg',
            'test16.jpeg',
        ]
    }]);
})

const server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
