const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()
const auth = require('../common/auth')
const UsersQuery = require('../controller/query')

router.get('/',auth.validate,auth.mentorGaurd,UsersController.getUsers)

router.get('/:id',auth.validate, UsersController.getUserById)

router.post('/',UsersController.createUser)

router.put('/:id',UsersController.editUserById)

router.delete('/:id',auth.validate,UsersController.deleteUserById)

router.post('/login',UsersController.loginUser)

router.put('/change-password/:id',auth.validate,UsersController.changePassword)

router.post('/:id/createquery',UsersQuery.createquery)

router.get('/:id/getquery',auth.validate,auth.mentorGaurd,UsersQuery.getquery)

router.get('/:queryId/getquerybyid', auth.validate,UsersQuery.getqueryById)

router.post('/:queryId/editquerybyid',UsersQuery.editqueryById)



module.exports = router