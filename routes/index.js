const routes = require('express').Router();
const controller = require('../controllers')
const swagger = require('./swagger')
const swaggerDocument = require('../swagger.json');

routes.use('/', swagger)

routes.get('/', controller.helloWorld);

routes.use('/recipes', require('./recipes'));
routes.use('/users', require('./users'));
routes.use('/favorites', require('./favorites'));
routes.use('/tips', require('./tips'));

module.exports = routes