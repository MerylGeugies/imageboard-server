const Router = require('express');
const Image = require('./model');
const router = new Router();

router.get('/images', (request, response, next) => {
  Image
  .findAll()
    .then(pics => response.send(pics))
    .catch(next)
})

router.post('/images', (request, response, next) =>{
  Image
  .create(require.body)
  .then(pic => response.json(pic)) 
  .catch(next)
})

module.exports = router;
