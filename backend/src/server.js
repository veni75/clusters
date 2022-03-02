const express = require('express');
const config = require('config');

const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cors = require('./config/cors');
app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));

const { username, password, host } = config.get('database');
mongoose    
    .connect(`mongodb+srv://${username}:${password}@${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => logger.info('MongoDB connection has been established successfully.'))
    .catch(err => {
        logger.error(err);
        process.exit();
    });

app.use(express.static('public'));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/clusters', require('./controllers/cluster/cluster.routes'));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;