const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { findOne } = require('../models/userModel')
const salt = 10

exports.signUp = async (req, res) => {
    const { username, password } = req.body
    try {
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            password: hashedpassword
        })
        req.session.user = newUser
        res.status(201).json({
            status:'Success',
            data: {
                user: newUser
            }
        })
    }
    catch(e) {
        res.status(400).json({status: 'Failure'})
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try{
        const user = await User.findOne({username})
        if (!user) {
            res.status(404).json({
                status:'Failure',
                msg: 'User not found'
            })
        }
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            req.session.user = user 
            res.status(200).json({
                status: 'success',
                msg: `Welcome ${user.username}`
            })
        }
        else {
            res.status(400).json({
                status:'fail',
                msg: 'Username or password incorrect'
            })
        }
    }
    catch(e) {
        res.status(400).json({
            status: 'Failure'
        })
    }

}