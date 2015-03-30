

module.exports = function(app) {
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.get('*', function(req, rsp) {
    rsp.render('index')
  });

}
