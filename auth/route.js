const { Router } = require('express')
const { toJWT, toData } = require('./jwt.js')
const auth = require('./middleware')
const bcrypt = require('bcryptjs');
const router = new Router()
const User = require('../users/model')

router.post('/logins', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    } else {
        // VERIFY IF THE USER EXIST AND IF THE PASSWORD IS CORRECT
        User
            .find({ where: { email: req.body.email } })
            .then(
                function (user) {
                    if (user.password===req.body.password){
                        res.status(200).send(
                            //jwt: toJWT({ userId: 1 })
                            "LOGGED IN"
                        )
                    }else{
                        res.status(400).send(
                            "OPPS...there is a problem with your credentials"
                        )
                    }
                },
                function (errors) {
                    callback(errors);
                }
            )
    }
})

router.post('/users', (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.password_confirmation) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    } else {
        if (req.body.password !== req.body.password_confirmation) {
            res.status(400).send({
                message: 'Both passwords must be exactly the same'
            })
        } else {
            // VERIFY IF THE USER EXISTS
            User
                .findOrCreate({ where: { email: req.body.email }, defaults: { password: req.body.password } })
                .spread(function (user, created) {
                    if (created) {
                        res.status(201).send({
                            message: 'User Created'
                        })
                    } else {
                        res.status(400).send({
                            message: 'The user already exists. Please log in'
                        })
                    }


                })
        }
    }
})


module.exports = router



//$ http :4000/secret-endpoint Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUzNTM2MjIzMCwiZXhwIjoxNTM1MzY5NDMwfQ.DxFRClbZLP0L-fczkSiNHEiLqYI4HGbC8Ezrh3JhlG8"
