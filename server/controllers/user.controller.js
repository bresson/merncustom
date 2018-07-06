import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

/**
 * double check the err handling. is it async?
 * Errors that occur in synchronous code inside 
 * route handlers and middleware require no extra 
 * work. If an error is thrown by that synchronous 
 * code then it will be caught by Express and processed 
 * accordingly. 
 * 
 * Errors returned from asynchronous functions that are invoked by route handlers and middleware must be passed to the next() function where they will be caught by Express and processed accordingly. For example:
 **/
const create = (req, res, next) => {
    console.log('creating user')
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}

const list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(users)
    }).select("name email updated created");
}

/*
    If a matching user is found in the database, the user object is 
    appended to the request object in the profile key. 
    Then, the next() middleware is used to propagate 
    control to the next relevant controller function. 
    For example, if the original request was to read a 
    user profile, the next() call in userById would go 
    to the read controller function”
*/

const userByID = (req, res, next, id) => {
    User.findbyId(id).exec((err, user) => {
        if (err || !user) {
            return res.status("400").json({
                error: "User not found"
            })
        }
        req.profile = user;
        // next will go to the 'read' controller fn
        next();
    })
}

const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

/**
 * “The update function retrieves the user details from req.profile, then uses the lodash module to extend and merge the changes that came in the request body to update the user data. Before saving this updated user to the database, the updated field is populated with the current date to reflect the last updated at timestamp. On successful save of this update, the updated user object is cleaned by removing the sensitive data, such as hashed_password and salt, before sending the user object in the response to the requesting client”
 * 
 **/
const update = (req, res, next) => {
  let user = req.profile
  user = _.extend(user, req.body)
  user.updated = Date.now()
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  })
}

const remove = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser)
    })
}