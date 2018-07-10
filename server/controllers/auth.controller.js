import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

/**
 * The POST request object receives the email and password in req.body. This email 
 * is used to retrieve a matching user from the database. Then, the password 
 * authentication method defined in the UserSchema is used to verify the password 
 * received in the req.body from the client.
 * 
 * If the password is successfully verified, the JWT module is used to generate 
 * a JWT signed using a secret key and the user's _id value.
 *
 * Then, the signed JWT is returned to the authenticated client along with user 
 * details. Optionally, we can also set the token to a cookie in the response 
 * object so it is available to the client side if cookies is the chosen form 
 * of JWT storage. On the client side, this token must be attached as an 
 * Authorization header when requesting protected routes from the server”
*/


const signin = (req, res) => {
  User.findOne({
    "email": req.body.email
  }, (err, user) => {

    if (err || !user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email}
    })

  })
}
/**
 * “The signout function clears the response cookie containing the signed JWT. 
 * This is an optional endpoint and not really necessary for auth purposes if 
 * cookies are not used at all in the frontend. With JWT, user state storage 
 * is the client's responsibility, and there are multiple options for 
 * client-side storage besides cookies. On sign-out, the client needs to 
 * delete the token on the client side to establish that the user is no 
 * longer authenticated.
 * 
 * */
 
const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

/**
 * verify that the incoming request has a valid JWT in the Authorization 
 * header. If the token is valid, it appends the verified user's ID in an 
 * 'auth' key to the request object, otherwise it throws an authentication 
 * error.
 * 
 */
 
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}