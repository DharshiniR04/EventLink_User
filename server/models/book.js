const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registereddepartment:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        default: []
    },
    paymentstatus:{
        type:String,
        default:"Not Done",
        enum: ["Done", "Not Done"]
    },
    paymentqr:{
        type:String,
        default:""
    },
    enteredstatus: {
        type: String,
        default: "Not-Checked-IN",
        enum: ["Checked-IN", "Not-Checked-IN"]
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
