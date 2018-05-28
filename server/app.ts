import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as createError from 'http-errors';
import * as morgan from 'morgan';
import setRoutes from './routes/book';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('port', (process.env.PORT || 3000));

// see angular.json
app.use('/', express.static(path.join(__dirname, '../public')));


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.sendStatus(err.status || 500);
});

mongoose.connect('mongodb://localhost/six', {promiseLibrary: require('bluebird')})
  .then(() => {
    console.log('Connected to MongoDB');

    setRoutes(app);

    if (!module.parent) {
      const port = app.get('port');
      app.listen(port, () => {
        console.log('listening on port' + port);
      });
    }

  })
  .catch(err => console.error(err));

export { app };
