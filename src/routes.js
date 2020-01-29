const { Router } = require('express');

const DevController = require('./controllers/DevController');

const routes = Router();

routes.get('/devs', DevController.find);
routes.get('/devs/:id', DevController.retrieve);
routes.post('/devs', DevController.create);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.delete);

module.exports = routes;
