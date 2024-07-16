const express = require('express');
const mongoose = require('mongoose');

// User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    place: String
});

module.exports = mongoose.model('User', userSchema);