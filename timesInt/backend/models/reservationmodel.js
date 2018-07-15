var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var minute = require('mongoose-minute');
var Schema = mongoose.Schema;

ReservationSchema = new Schema({
    firstName : {
      type: String,
      required: true
    },
    lastName : {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true,
      validate: [
        validate({
          validator: 'isEmail'
        })
      ]
    },
    noOfGuests: {
			type: Number,
			required: true
    },
    comments: {
			type: String,
			required: true
    },
    archived: {
			value: {
				type: Boolean,
				default: false
			}
		},
		reservedOn: {
			type: Date
		}
});
minute(ReservationSchema, {
  createdAt: 'createdAt'
});
minute(ReservationSchema, {
  modifiedAt: 'modifiedAt'
});
Users = mongoose.model('Reservation', ReservationSchema);
module.exports = Users;