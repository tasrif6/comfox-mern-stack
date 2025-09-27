import express from 'express';
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController } from '../controllers/authController.js'
// another import will be above here verifyOTPController
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router()

//routing
//Register || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController);

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);
// router.get('/test', testController);

//protected User-route auth
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ ok: true });
    // router.post('/verify-otp', verifyOTPController);
});

//protected Admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ ok: true });
    // router.post('/verify-otp', verifyOTPController);
});

//update profile
router.put('/profile', requireSignIn, updateProfileController);

//orders
router.get('/orders', requireSignIn, getOrdersController);

export default router;