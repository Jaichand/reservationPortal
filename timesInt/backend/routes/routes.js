var express = require('express');
var User = require('../models/reservationmodel.js');
var config = require('../config');
var Router = express.Router();
app = express();

function createRes(req) {
	return new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		noOfGuests: req.body.noOfGuests,
		comments: req.body.comments,
		reservedOn: req.body.reservedOn
	});
}

Router.get('/getAllReseravtion', function(req, res) {
	//$gte: ISODate("2010-04-29T00:00:00.000Z"),
	//$lt: ISODate("2010-05-01T00:00:00.000Z")
	console.log('what is this', req.query);
	let obj = {archived: {value: false}};
	if (req.query.filter) {
		console.log('are you here?');
		if (req.query.greater && req.query.lesser) {
			obj.reservedOn = {
				$gte: req.query.greater,
				$lt: req.query.lesser,
			}
		} else if (req.query.greater) {
			obj.reservedOn = {
				$gte: req.query.greater
			}
		} else if (req.query.lesser) {
			obj.reservedOn = {
				$lt: req.query.lesser
			}
		}
	}
	console.log('See obj Here', obj);
	User.find(obj, function(err, reservations) {
		if (err) {
			throw err;
		}
		res.status(200).json({success: true, reservations: reservations});
	});
});

Router.post('/addReservation', function(req, res) {
	User.findOne({email: req.body.email}, function(err, existR){
		if(existR) {
			if(existR.reservedOn != req.body.reservedOn){
				let reserv = createRes(req);
				reserv.save(function(err, reserv) {
					if (err) throw err;
					console.log('Saved Successfully', req.body);
					res.status(200).json({data: reserv});
				});
			} else {
				res.status(200).json({message: 'You already booked on this Schedule'})
			}
		} else {
			let reserv = createRes(req);
			reserv.save(function(err, reserv) {
				if (err) throw err;
				console.log('Saved Successfully', req.body);
				res.status(200).json({data: reserv});
			});
		}
	});
});

Router.post('/deleteRes', function(req, res) {
	User.findOne({_id: req.body.id}, function(err, reservation) {
		if(reservation) {
			reservation.archived.value = true;
			reservation.modifiedAt = Date.now();
			reservation.save(function(err, val) {
				if (err) throw err;
				res.status(200).json({message: 'Deleted Succesfully', data: val});
			});
		}
	});
});

Router.post('/editRow', function(req, res) {
	User.findOne({_id: req.body._id}, function(err, reservation) {
		if(reservation) {
			reservation.firstName = req.body.firstName,
			reservation.lastName = req.body.lastName,
			reservation.email = req.body.email,
			reservation.noOfGuests = req.body.noOfGuests,
			reservation.comments = req.body.comments,
			reservation.reservedOn = req.body.reservedOn
			reservation.modifiedAt = Date.now();
			reservation.save(function(err, val) {
				if (err) throw err;
				res.status(200).json({message: 'Deleted Succesfully', data: val});
			});
		}
	});
});

module.exports = Router;