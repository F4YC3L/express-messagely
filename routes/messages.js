const express = require("express");
const Message = require("../models/message");
const ExpressError = require("../expressError")
const router = new express.Router();

const { ensureLoggedIn, ensureCorrectUser, authenticateJWT } = require("../middleware/auth");





/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureCorrectUser, async function(req, res, next){
    try {
        let id = req.params.id
        let message = await Message.get(id);
        if( message){
            return res.json({message: message});
        }
    }
    catch(err){
        next(err);
    }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureCorrectUser, async function(req, res, next){
    try {
        let user = jwt.decode(token);

        let {to_username, body} = req.body
        let message = {
            from_username:user.username,
            to_username: to_username,
            body: body
        }


    } catch(err){
        return next(err);
    }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 router.post("/:id/read", ensureCorrectUser, async function(req, res, next){
    try {

        const msg = await markRead(req.params.id);
        if(msg){
            return res.json({message: {id: msg.id, read_at: msg.read_at}})
        }

    } catch(err){
        return next(err);
    }


 });


module.exports = router;
