
var router = function (app) {

    var clientController = require('../controllers/controller.js')

    app.get('/', clientController.welcomeMessage);
    app.get('/client/', clientController.getClients);
    app.get('/client/id/', clientController.getClientById);
    app.post('/create_client/', clientController.createClient);
}

module.exports = router;