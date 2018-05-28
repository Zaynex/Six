import * as express from 'express';
import Book from '../models/book';

const router = express.Router();

/** GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Book.find(function(err, products) {
    if (err) { return next(err); }
    res.json(products);
  });
});

/** GET SIGNLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

/** SAVE BOOK */
router.post('/', function(req, res, next) {
  Book.create(req.body, function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

/** UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

/** DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});


export default router;
