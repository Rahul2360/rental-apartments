// Importing important packages
const express = require('express');

// Using express and routes
const route = express.Router();

let apartmentModel = require('./apartment');

// To Add New user
route.route('/addApartment').post(function (req, res) {
  let apartment_payload = new apartmentModel(req.body);
  apartment_payload.save()
    .then(data => {
      res.status(200).json({
        'errCode': 0,
        'msg': 'Apartment added Successfully'
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        'errCode': 90,
        'msg': 'Some internal error'
      });
    });
});

route.route('/getApartments').get(function (req, res) {
  let login_user_id = req.headers.user_id;
  apartmentModel.find({}, function (err, apartments) {
    var apartment_list = [];

    apartments.forEach(function (apartment) {
      if(apartment.owner_id._id != login_user_id) {
        apartment_list.push(apartment);
      }
    });

    res.json({
      'errCode': 0,
      'datalist': apartment_list
    });
  });
});

route.route('/getUserApartments').get(function (req, res) {
  let login_user_id = req.headers.user_id;
  apartmentModel.find({"owner_id": login_user_id}, function (err, apartments) {
    const apartment_list = [];
    apartments.forEach(function (apartment) {
      apartment_list.push(apartment);
    });

    res.json({
      'errCode': 0,
      'datalist': apartment_list
    });
  });
});

module.exports = route;