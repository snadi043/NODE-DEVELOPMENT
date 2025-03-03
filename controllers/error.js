// GET Request to handle the 404 Error Page using the controllers in the MVC pattern
exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
