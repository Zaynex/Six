export default abstract class BaseCtrl {
  abstract model: any;

  getAll = (req, res, next) => {
    this.model.find({} , (err, data) => {
      if (err) { return next(err); }
      res.json(data);
    });
  }

  get = (req, res, next) => {
    this.model.findById(req.params.id, (err, post) => {
      if (err) { return next(err); }
      res.json(post);
    });
  }

  update = (req, res, next) => {
    this.model.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) { return next(err); }
      res.json(post);
    });
  }

  insert = (req, res, next) => {
    this.model.create(req.body, (err, post) => {
      if (err) { return next(err); }
      res.json(post);
    });
  }

  delete = (req, res, next) => {
    this.model.findByIdAndRemove(req.params.id, req.body, (err, post) => {
      if (err) { next(err); }
      res.json(post);
    });
  }
}
