module.exports = {
  NotFound: function(req, res) {
    res.status(404);
    return res.render('404');
  }
};
