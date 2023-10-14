const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()
const auth = require('../common/auth')


router.get('/',auth.validate,auth.mentorGaurd,UsersController.getUsers)

router.get('/:id',auth.validate, UsersController.getUserById)

router.post('/',UsersController.createUser)

router.put('/:id',auth.validate,auth.mentorGaurd,UsersController.editUserById)

router.delete('/:id',auth.validate,auth.mentorGaurd,UsersController.deleteUserById)

router.post('/login',UsersController.loginUser)

router.put('/change-password/:id',auth.validate,UsersController.changePassword)

router.post('/query', UsersController.createquery)





module.exports = router