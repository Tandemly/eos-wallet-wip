const express = require("express");
const validate = require("express-validation");
const controller = require("./app.controller");
const { login, register } = require("./app.validation");

const router = express.Router();

router
  .route("/register")
  /**
   * @api {post} app/register Register User (singup)
   * @apiDescription Register a new user
   * @apiVersion 1.0.0
   * @apiName Register
   * @apiGroup App
   * @apiPermission public
   *
   * @apiParam  {String}          email     User's email
   * @apiParam  {String{6..128}}  password  User's password
   * @apiParam  {String}          [display_name] Full name for display
   * @apiParam  {String}          [phone] Phone number
   * @apiParam  {String}          [about] Short description or bio
   * @apiParam  {String}          [location] City, state or Location description
   * @apiParam  {String}          [website] url link for website
   * @apiParam  {String}          [image_url] url of avatar profile image
   *
   * @apiSuccess  (Created 201) {String}          id  Profile id
   * @apiSuccess  (Created 201) {String}          email  User's email
   * @apiSuccess  (Created 201) {String}          display_name Full name for display
   * @apiSuccess  (Created 201) {String}          phone Phone number
   * @apiSuccess  (Created 201) {String}          about Short description or bio
   * @apiSuccess  (Created 201) {String}          location City, state or Location description
   * @apiSuccess  (Created 201) {String}          website url link for website
   * @apiSuccess  (Created 201) {String}          image_url url of avatar profile image
   *
   * @apiError (Conflict 409)     ValidationError  Email already exists
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   */
  .post(validate(register), controller.register);

router
  .route("/login")
  /**
   * @api {post} app/login Login
   * @apiDescription Login and get Profile
   * @apiVersion 1.0.0
   * @apiName Login
   * @apiGroup App
   * @apiPermission public
   *
   * @apiParam  {String}          email     User's email
   * @apiParam  {String{6..128}}  password  User's password
   *
   *
   * @apiSuccess  (Created 201) {String}          id  Profile id
   * @apiSuccess  (Created 201) {String}          email  User's email
   * @apiSuccess  (Created 201) {String}          display_name Full name for display
   * @apiSuccess  (Created 201) {String}          phone Phone number
   * @apiSuccess  (Created 201) {String}          about Short description or bio
   * @apiSuccess  (Created 201) {String}          location City, state or Location description
   * @apiSuccess  (Created 201) {String}          website url link for website
   * @apiSuccess  (Created 201) {String}          image_url url of avatar profile image
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
   */
  .post(validate(login), controller.login);

module.exports = router;
