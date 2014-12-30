var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql_handler=require('./modules/mysql_handler/mysql_handler');
var crypto = require('crypto');
var settings = require('./settings');

function do_login(username, password, done){
  mysql_handler.get_user_by_user_email(username, function(err, user, msg){

    if(err) {
      return done(err);
    }
    if(!user) {
      if(msg.errno === 101){
        console.log(msg.message);
        return done(null, false, { errno: 11, message: 'Incorrect username.' });
      }else{
        return done(null, false, { errno: 99, message: 'Unknown error.' });
      }
    }

    // hash the password to compare
    var crypted_password = crypto.createHmac('sha256',settings.data.hashkey).update(password).digest('binary');

    if (user.user_passwd !== crypted_password 
        && user.user_lost_tocken !== password) {
      return done(null, false, { errno: 12, message: 'Incorrect password.' });
    }

    if (user.user_state !== 'N'){
      if(user.user_state === 'L'){
        return done(null, false, { errno: 20, message: 'Leaved user.' });
      }else if(user.user_state === 'I'){
        return done(null, false, { errno: 21, message: 'Intercepted user.' });
      }else{
        return done(null, false, { errno: 29, message: 'User state unknown error.' });
      }
    }

    //TODO - user_login_date, user_login_ip, user_login_country -> save
    // Do something else.....

    console.log('login success.');
    done(null, user, { errno: 10, message: 'Login success.' });
  });
}

function do_join(_user, done){//TODO - Doing...

  var user = [];

  if(!_user){
  }
  if(!_user.user_email || !_user.user_passwd || !_user.user_name || !_user.user_nickname || !_user.user_job || !_user.user_sex || !_user.user_homepage){
  }
  if(!_user.user_passwd){
  }
  if(!_user.user_name){
  }
  if(!_user.user_)
  

  user.push(_user.user_email);
  user.push(_user.user_passwd);
  user.push(_user.user_name);
  user.push(_user.user_nickname);
  user.push(_user.user_job);
  user.push(_user.user_sex);
  user.push(_user.user_homepage);
  user.push(_user.user_recommend_id);
  user.push(_user.user_profile);
  user.push(_user.user_ip);
  user.push(_user.user_ip_country);
  user.push(_user.user_state);
  user.push(_user.user_open_level);
  user.push(_user.user_range);

}

/* Login Process
   After login complete, you can access with req.user */
passport.use(new LocalStrategy({
    usernameField: 'user_email',
    passwordField: 'user_passwd'
  }, do_login	// do_login(username, password, done);
));


// Serialize the user_id
passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});

// Deserialize from user_id
passport.deserializeUser(mysql_handler.get_user_by_user_id);


// Export passport
module.exports = passport;
