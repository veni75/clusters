require('dotenv').config();
const config = require('config');

const logger = require('./config/logger');
const app = require('./server');

const port = process.env.PORT || 3000;

//Database connection
if (!config.has('database')) {
  logger.error('No database config found.');
  process.exit();
}

app.use('/clusters', require('./controllers/cluster/cluster.routes'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})