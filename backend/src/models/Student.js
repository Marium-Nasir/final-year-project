const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require("bcryptjs")
let StuSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:'String',
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})
StuSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.pass);
};
module.exports = mongoose.model('student',StuSchema)