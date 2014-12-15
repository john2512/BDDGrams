/*jslint node: true, sloppy: true*/

module.exports = function (app) {

  // 404s
  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
      return res.render('404.html');
    }

    if (req.accepts('json')) {
      return res.json({ error: 'Not found' });
    }

    // default response type
    res.type('txt');
    res.send("Hmmm, couldn't find that page.");
  });

   // 500
  app.use(function (err, req, res, next) {
    console.error('error at %s\n', req.url, err.stack);
    res.status(500).send("Oops, we made a boo boo.");
  });
};
