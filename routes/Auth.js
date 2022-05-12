const router = require('express').Router()
const SignupUser = require('../controllers/Auth/Signup')
const LoginUser = require('../controllers/Auth/Login')

router.post('/signup', SignupUser)
router.post('/login', LoginUser)

module.exports = router
