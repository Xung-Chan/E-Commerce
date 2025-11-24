import { Router } from "express";
import siteController from "../controllers/Site.controller.js";
import { isLoggedIn } from "../middleware/authJwt.middleware.js";
const siteRouter = Router();

//landing Page
siteRouter.get("/", isLoggedIn, siteController.home);

// Login
siteRouter.get('/login', isLoggedIn, siteController.login);
siteRouter.post('/login', siteController.loginPost);

// Forgot Password
siteRouter.get('/forgot-password', isLoggedIn, siteController.forgotPassword);
siteRouter.post('/forgot-password', siteController.forgotPasswordPost);

// Reset Password
siteRouter.get('/reset-password', siteController.resetPassword);
siteRouter.post('/reset-password', siteController.resetPasswordPost);

// Register
siteRouter.get('/register', isLoggedIn, siteController.register);
siteRouter.post('/register', siteController.registerPost);

// Logout
siteRouter.get('/logout', siteController.logout);
siteRouter.post('/logout', siteController.logout);

// Profile
siteRouter.get('/profile', isLoggedIn, siteController.profile);
siteRouter.post('/profile/addresses/me', isLoggedIn, siteController.profileAddAddress);
siteRouter.post('/profile/addresses/me/:addressId', isLoggedIn, siteController.profileDeleteAddress);
siteRouter.post('/profile/addresses/me/update/:addressId', isLoggedIn, siteController.profileUpdateAddress);
siteRouter.post('/profile/update-user', isLoggedIn, siteController.profileUpdateUser);
siteRouter.post('/profile/update-password', isLoggedIn, siteController.profileChangePassword);

// Catalog
siteRouter.get('/catalog', isLoggedIn, siteController.catalog);

// Product details
siteRouter.get('/product/:productId', isLoggedIn, siteController.product);
siteRouter.post('/product/add-to-cart', isLoggedIn, siteController.productAddToCart);

// Cart
siteRouter.get('/cart', siteController.cart);

// Checkout
siteRouter.get('/checkout', siteController.checkout);

// Order Result
siteRouter.get('/order/result/:orderId', siteController.orderResult);


export default siteRouter;