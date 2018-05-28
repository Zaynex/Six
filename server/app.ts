import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as createError from 'http-errors';
import * as morgan from 'morgan';
import apiRoutes from './routes/book';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('port', (process.env.PORT || 3000));

// see angular.json
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', apiRoutes);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.status);
});

mongoose.connect('mongodb://localhost/six', {promiseLibrary: require('bluebird')})
  .then(() => {
    console.log('Connected to MongoDB');

    const port = app.get('port');
    if (!module.parent) {
      app.listen(port, () => {
        console.log('listening on port' + port);
      });
    }

  })
  .catch(err => console.error(err));

export { app };
