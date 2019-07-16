/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
userRoutes.get("/", ensuredLoginIn, async function (req, res, next)
 {
    try {
        let result = await User.all();
        return res.json({users:result});
    }
    catch(err){
        next(err);
    }
});
/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
userRoutes.get("/:username", ensuredLoginIn, async function (req, res, next){
    
	try {
		let username = req.params.username
		let user = await User.get(username);
		if(user){
			return res.json({user: result})
		}
		const err = new ExpressError("Unauthonicate", 401);
	}
	catch(err){
		next(err);
	}
    
});
/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

userRoutes.get("/:username/to", ensureCorrectUser, async function (req, res, next){
    
	try {
		let username = req.params.username
		let user = await User.messagesTo(username);
		if(user){
			return res.json({messages: result})
		}
	}
	catch(err){
		next(err);
	}  
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

userRoutes.get("/:username/from", ensureCorrectUser, async function (req, res, next){
    
	try {
		let username = req.params.username
		let user = await User.messagesFrom(username);
		if(user){
			return res.json({messages: result})
		}
	}
	catch(err){
		next(err);
	}  
});
