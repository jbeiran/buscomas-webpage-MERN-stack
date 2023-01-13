const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/register', userCtrl.register);

router.post('/activation', userCtrl.activateEmail);

router.post('/login', userCtrl.login);

router.post('/forgot', userCtrl.forgotPassword);

router.post('/reset', auth, userCtrl.resetPassword);

router.post('/contact', userCtrl.contact);

router.get('/logout', userCtrl.logout);

router.get('/refresh_token', userCtrl.refreshToken);

router.get('/infor', auth, userCtrl.getUser);

router.get('/all_infor', auth, authAdmin, userCtrl.getAllUsers);

router.patch('/addfav', auth, userCtrl.addFav);

router.patch('/update', auth, userCtrl.updateUser);

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole);

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser);

module.exports = router;