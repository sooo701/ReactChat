import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan';
import bodyParser from 'bodyParser';

import api from './routes';

const devPort = 4000;

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/hello', (req, res) => {
  return res.send('Hello My First React App');
});

app.listen(port, () => {
  console.log('Express is listening on port', port);
});

/*
* dev Section
*/
if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(
    devPort, () => {
      console.log('webpack-dev-server is runnign on port', devPort);
    }
  );
}

/*
 * Mongodb Section
 */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("Connected to mongodb server");
});
//mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/reactChat');

app.user(session({
  secret : 'reactChat',
  resave : false,
  saveUninitialized : true
}));
