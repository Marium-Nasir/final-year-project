const express = require('express')
const router = express.Router()
const {sinupdata, authUser, otpCheck, resetfunc} = require('../controller/controller')
const {body} = require('express-validator')

  router.post('/',[
    body('fname').isLength({min:3}),
    body('lname').isLength({min:3}),
    body('email').isEmail(),
    body('pass').isLength({min:5})

],sinupdata)
router.post("/login", authUser);
router.post('/forgotpass',otpCheck)
router.post("/resetyourpass/:id/:token", resetfunc);

 

module.exports = router