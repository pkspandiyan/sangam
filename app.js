var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ClientOAuth2 = require('client-oauth2')

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
 
var githubAuth = new ClientOAuth2({
  clientId: '6851d97688e24912caeb',
  clientSecret: '97e955bf00ebd800aa0c129822ae8c6771c95719',
  accessTokenUri: 'https://github.com/login/oauth/access_token',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://nila.co/auth/github/callback',
  scopes: ['repo']
})

app.get('/auth/github', function (req, res) {
  var uri = githubAuth.code.getUri() 
  res.redirect(uri)
})
 
app.get('/auth/github/callback', function (req, res) {
  githubAuth.code.getToken(req.originalUrl)
    .then(function (user) {
      console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
 
      // Refresh the current users access token.
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      })
 
      // Sign API requests on behalf of the current user.
      user.sign({
        method: 'get',
        url: 'http://nila.co'
      })

      responseStr = `
      <script>
      (function() {
      function recieveMessage(e) {
        console.log("recieveMessage %o", e);
        if (e.data == "authorizing:github") {     
              window.opener.postMessage(
                'authorization:github:success:{\"token\":\"${user.accessToken}\",\"provider\":\"github\"}',
                e.origin);
        }
      }
      
      window.addEventListener("message", recieveMessage, false);
      // Start handshare with parent
      console.log("Sending message: %o", "github")
      window.opener.postMessage("authorizing:github", "*");
      })()
      </script>      
      `;
 
      // We should store the token into a database.
      return res.send(responseStr)
    })
})

//app.use(express.static('public'));
//app.use('/routes', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
  //res.render('error');
});

module.exports = app;
