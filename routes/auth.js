const User = require("../models/user")
const express = require("express");
const router = new express.Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async function(req,res,next){
  try{
    const { username, password } = req.body;

    if(User.authenticate(username, password)) {
      User.updateLoginTimestamp(username);
      let token = jwt.sign({ username }, SECRET_KEY);
      return res.json({ token })
    }
    throw new ExpressError("Invalid user/password", 400);
  } catch(err) {
      return next(err)
  }
});


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

 router.post("/register", async function(req, res, next){
   try{
    const { username,
            password,
            first_name,
            last_name,
            phone } = req.body;

   let user = User.register(username, password, first_name, last_name, phone);
   if(user){
    User.updateLoginTimestamp(user.username);
    let token = jwt.sign({ username }, SECRET_KEY);
    return res.json({ token });
   }
   throw new ExpressError("Username exist!", 400);

   }catch(err){
      return next(err);
   }
 });


 module.exports = router;
