const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: [true, "A user is already registered with that email"],
        required: [true, 'Email is required'],
    },
    name: {
        first: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        last: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
    },
    password: {
        type: String,
        required: [true, 'Password and Confirm Password are required'],
        minlength: 8,
        maxlength: 32,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    },
    birthday: {
        type: Date,
        required: [true, 'Birthday is required'],
    }
});

UserSchema.methods.full_name = function () {
    return this.name.first + " " + this.name.last;
};

UserSchema.pre('save', function (next) {
    console.log("okay" + this);
    var self = this;
    bcrypt.hash(this.password, 10, function (err, hash) {
        console.log(err);
        self.password = hash;
        console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + self);
        next();
    });
});

const User = mongoose.model('User', UserSchema);