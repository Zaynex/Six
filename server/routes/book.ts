import * as express from 'express';
import Book from '../models/book';
import BookCtrl from '../controllers/book';


export default function setRoutes(app) {
  const router = express.Router();

  const bookCtrl = new BookCtrl();

  // Book
  router.route('/').get(bookCtrl.getAll);
  router.route('/:id').get(bookCtrl.get);
  router.route('/').post(bookCtrl.insert);
  router.route('/:id').put(bookCtrl.update);
  router.route('/:id').delete(bookCtrl.delete);


  // Apply the routes to our application with prefix /api
  app.use('/api', router);
}


