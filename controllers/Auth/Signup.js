const User = require('../../models/User')
const ValidateEmail = require('../../utils/ValidateEmail')

module.exports = async (req, res) => {
  const { name, email, password } = req.body
  let error = {}

  if (!name || name.trim().length === 0) {
    error.name = 'name field must be required'
  }

  if (!ValidateEmail(email)) {
    error.email = 'email address should be valid '
  }

  if (!email || email.trim().length === 0) {
    error.email = 'email field must be required'
  }

  if (!password || password.trim().length === 0) {
    error.password = 'password must be required'
  }
  
  if (Object.keys(error).length) {
    return res.status(422).json({ error })
  }

  try {
    const user = await User.findOne({ email })
    if (user) { res.status(400).json({ error: 'email already exists' }) }
    else {
      const registerUser = new User({
        name,
        email,
        password,
      })
      const saveUser = await registerUser.save()
      await saveUser.save()
      res.status(201).json({
        message: `Account created Successfully for ${name}`,
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
}
