import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/userCtrl.js';

//Added auth middleware protection to the routes
import auth from '../middleware/auth.js';



router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/infor/:id', auth, userCtrl.getUserInforParam)

router.get('/allprof', auth, userCtrl.allusers)

router.post('/reset', auth, userCtrl.resetPassword)

router.delete('/delete', auth, userCtrl.deleteUser)

router.patch('/update', auth, userCtrl.updateUser)

router.get('/logout', userCtrl.logout)

router.post('/google_login', userCtrl.googleLogin)

router.post('/google_signup', userCtrl.googleSignup)

export default router;