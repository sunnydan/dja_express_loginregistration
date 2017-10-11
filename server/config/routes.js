var users = require('../controllers/users.js');

module.exports = function(app) {

    app.get('/', function (req, res){
        users.login_registration(req, res);
    });

    app.get('/logout', function(req, res){
        users.logout(req, res);
    });

    app.post('/process_login', function(req, res){
        users.process_login(req, res);
    });

    app.post('/process_registration', function(req, res){
        users.process_registration(req, res);
    });

    app.get('/user', function(req, res){
        users.user_page(req, res);
    });
};