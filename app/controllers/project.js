exports.index = (request, response, next) => {
  response.render('index', {title: 'Title...'});
};
