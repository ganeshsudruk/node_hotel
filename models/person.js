
const mongoose = require('mongoose');

//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required:true

    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
});

// cerate person model

const Person = mongoose.model('person', personSchema);
module.exports = Person;