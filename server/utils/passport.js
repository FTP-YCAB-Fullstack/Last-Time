var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require('../models/User')
const jwt = require('jsonwebtoken')
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: "972114441417-4u36259k50o19vpsnda5pp067jsk5uf2.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:8000/auth/google/callback"
		},
		async function(accessToken, refreshToken, profile, done) {
			try {
				var userData = {
					email: profile.emails[0].value,
					name: profile.displayName,
				};
				let check = await User.find({ email: userData.email }).count()
				console.log('ada user atau tidak? => ' ,check)
				if (!check) {
					await User.create({
						name: userData.name,
						email: userData.email,
						role: "user"
					})
				}


				let user = await User.findOne({ email: userData.email })
				console.log(user)
				let payload = {
					userId: user.id,
					updateAt: user.updateAt,
					role: user.role
				}
				const token = jwt.sign(payload, process.env.JWT_KEY)
				const role = user.role;
				const subRole = user.subRole
				const currentUser ={
					id: user._id,
					name: user.name
				}
				const response = {
					user: currentUser,
					token,role,subRole
				}
				done(null, response);
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		}
	)
);
