'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');
var stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

// // Get list of payments
// exports.index = function(req, res) {
//   Payment.find(function (err, payments) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, payments);
//   });
// };

// // Get a single payment
// exports.show = function(req, res) {
//   Payment.findById(req.params.id, function (err, payment) {
//     if(err) { return handleError(res, err); }
//     if(!payment) { return res.send(404); }
//     return res.json(payment);
//   });
// };

// Creates a new payment in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  var stripeToken = req.body.token;
  var chargeAmount = req.body.cost;
  var chargeUser = req.body.user;
  var chargeDescription = req.body.description;

  var charge = stripe.charges.create({
    amount: chargeAmount * 100, // This is done in cents for some reason.
    currency: "usd",
    source: stripeToken,
    description: chargeUser + ":" + chargeDescription // The description of the user and what is being charged for
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        // The card has been declined
        console.log('the card has been declined');
      }
    }
  );

  console.log('stipe token');
  console.log(stripeToken);

  // We want to create a record of the users charge because what if some shit happens right?
  var chargeRecord = {
    user: chargeUser,
    amount: chargeAmount,
    description: chargeDescription
  };
  console.log('Heres the charge record');
  console.log(chargeRecord);

  Payment.create(chargeRecord, function(err, payment) {
    if(err) { return handleError(res, err); }
    return res.json(201, payment);
  });

  // stripe.customers.create({
  //   source: stripeToken,
  //   description: customerDescription
  // }).then(function(customer) {
  //   return stripe.charges.create({
  //     amount: chargeAmount * 100, //this is done in cents for some reason
  //     currency: "usd",
  //     customer: customer.id
  //   });
  // }).then(function(charge) {
  //   saveStripeCustomerId(customerDescription, charge.customer);
  // });


};

// // Updates an existing payment in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Payment.findById(req.params.id, function (err, payment) {
//     if (err) { return handleError(res, err); }
//     if(!payment) { return res.send(404); }
//     var updated = _.merge(payment, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, payment);
//     });
//   });
// };

// // Deletes a payment from the DB.
// exports.destroy = function(req, res) {
//   Payment.findById(req.params.id, function (err, payment) {
//     if(err) { return handleError(res, err); }
//     if(!payment) { return res.send(404); }
//     payment.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}