
let middleware = require('../middleware');
let HandlerGenerator = require('./handler');


let handlers = new HandlerGenerator();

module.exports = function (app) {
    app.post('/login', function (req, res, next) {
        console.log('login');
        handlers.login(req,res);
    });
    app.get('/', function (req, res, next) {
        res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/index.html');
    });

    app.get('/login', function (req, res, next) {
        res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/login.html');
    });

    app.get('/register', function (req, res, next) {
        console.log('admin language');
        res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/register.html');
    });

    app.get('/admin/language', function (req, res, next) {
        console.log('admin language');
        middleware.checkToken(req,res,next,'moderator').then((result) => {
            if(result){
                res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/admin/language.html');
            }
        });
        
    });

    app.get('/admin/word', function (req, res, next) {
        console.log('admin language');
        //middleware.checkToken(req,res,next);
        res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/admin/word.html');
    });

    app.get('/admin/wordTranslated', function (req, res, next) {
        console.log('admin language');
        //middleware.checkToken(req,res,next);
        res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/admin/wordTranslated.html');
    });

    app.get('/admin/category', function (req, res, next) {
        console.log('admin language');
        //middleware.checkToken(req,res,next);
        res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/admin/category.html');
    });
};