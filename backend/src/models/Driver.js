const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose
let DriSchema = new Schema({
    fname:{
        type:'String',
        required:true
    },
    lname:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true
    },
    phone:{
        type:'String',
        required:true
    },
    role:{
        type:'String',
        required:true
    },
    pass:{
        type:'String',
        required:true
    },
    
});

DriSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.pass);
  };

DriSchema.pre("create",async function(next){
    try{
        if(this.isModified(pass)){
           this.pass = await bcrypt.hash(this.pass,100);
            this.cpass = await bcrypt.hash(this.pass,10);
           next();
        }
    }catch(e){
       console.log(e);
    }
})

module.exports = mongoose.model('driver',DriSchema)