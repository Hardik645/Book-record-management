const express = require("express");
const router = express();
const { getAllUsers, createNewUser, getUsersById, updateUsersById, deleteById, getSubById } = require("../controllers/userController");

//get all users
router.get('/', getAllUsers);
//get user by id para
router.get('/:id', getUsersById);
//add new user
router.post('/', createNewUser);
//update user by id
router.put('/:id', updateUsersById);
//delete user by id
router.delete('/:id',deleteById);
//get sub detail by id
router.get('/subscription-details/:id',getSubById);

module.exports = router;