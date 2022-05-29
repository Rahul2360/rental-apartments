// Importing important packages
const express = require('express');

// Using express and routes
const app = express();
const route = express.Router();

let userModel = require('./user');

// To Add New user
route.route('/addUser').post(function (req, res) {
  let user_payload = new userModel(req.body);
  console.log(user_payload)
  userModel.find({
    "email": user_payload.email
  } ,function (err,user) {
    if (err) {
      console.log(err)
    } else {
      if(user != undefined && user.length) {
        console.log(user)
        if(user[0].email == user_payload.email) {
          res.status(200).json({
            'errCode': 1,
            'msg': 'User already exist'
          });
        } else {
          // Do nothing
        }
      } else {
        user_payload.save()
        .then(data => {
          res.status(200).json({
            'errCode': 0,
            'msg': 'User created Successfully'
          });
        }).catch(err => {
          res.status(400).json({
            'errCode': 90,
            'msg': 'Some internal error'
          });
        });
      }
    }
  })
});

// To Get user Details By email and password
route.route('/loginUser').post(function (req, res) {
  let user_payload = {
    email: req.body.email,
    password: req.body.password
  };
  userModel.find({
    "email": user_payload.email
  }, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      if (user != undefined && user.length) {
        if (user[0].password == user_payload['password']) {
          res.json({
            'errCode': 0,
            'msg': 'Login Succesfull',
            'data': user[0]
          });
        } else {
          res.json({
            'errCode': 2,
            'msg': 'Password is wrong'
          });
        }
      } else {
        res.json({
          'errCode': 1,
          'msg': "User not found"
        });
      }
    }
  });
});
module.exports = route;