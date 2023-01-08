const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:7000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      //return done(err, user);

      try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = new User({
          email: profile.emails[0].value,
          google: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });
        await newUser.save();
        request.user = newUser;

        return done(null, newUser);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
