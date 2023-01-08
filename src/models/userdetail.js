const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const userschema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    },
    registrationDate:{
        type:Date,
        default:Date.now
    }
});

const userData = mongoose.model('UserData',userschema);
module.exports = userData;