const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

router.post('/login', (request, response) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  else {
    // 1. find user based on email address
User
.findOne({
  where: {
    email: req.body.email
  }
})
.then(entity => {
  if (!entity) {
    res.status(400).send({
      message: 'User with that email does not exist'
    })
  }

  // 2. use bcrypt.compareSync to check the password against the stored hash
  if (bcrypt.compareSync(req.body.password, entity.password)) {

    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
    res.send({
      jwt: toJWT({ userId: entity.id })
    })
  }
  
  else {
    res.status(400).send({
      message: 'Password was incorrect'
    })
  }
})

.catch(err => {
  console.error(err)
  res.status(500).send({
    message: 'Something went wrong'
  })
})
  }

  response.send({
    jwt: toJWT({ userId: 1 })
  })
  });

router.get('/secret-endpoint', (request, response) => {
  const auth = request.headers.authorization && request.headers.authorization.split(' ')
  
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      response.send({
        message: 'Thanks for visiting the secret endpoint.',
        data
      })
    }
    
    catch(error) {
      response.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  
  else {
    response.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})

module.exports = router;