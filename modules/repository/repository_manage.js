

var git = require('../git_handler/git_handler');
var current_user = "";
var current_proejct = "";

var processSecurity = function(gitObject, method, repo) {

  var auth, creds, plain_auth, req, res;
  req = gitObject.request;
  res = gitObject.response;
  console.log(req.headers)
  auth = req.headers['authorization'];
  console.log(auth)
  if (auth === void 0) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    return res.end('<html><body>Need some creds son</body></html>');
  } else {
    plain_auth = (new Buffer(auth.split(' ')[1], 'base64')).toString();
    creds = plain_auth.split(':');
    console.log(creds)
    return permissableMethod(creds[0], creds[1], method, repo, gitObject);
  }
};

var permissableMethod = function(username, password, method, repo, gitObject) {
  var user, _ref;
  console.log(username, 'is trying to', method, 'on repo:', repo, '...');
	current_user = null;
	current_proejct = null;

  user = getUser(username, password, repo);
  if (user === false) {
    console.log(username, 'was rejected as this user doesnt exist, or password is wrong');
    return gitObject.reject(500, 'Wrong username or password');
  } else {	
	current_user = username;
	current_proejct = repo.split('.git')[0];
  	return gitObject.accept();
    // if (_ref = this.permMap[method], __indexOf.call(user.permissions, _ref) >= 0) {
    //   console.log(username, 'Successfully did a', method, 'on', repo);
    //   checkTriggers(method, repo, gitObject);
    //   return gitObject.accept();
    // } else {
    //   console.log(username, 'was rejected, no permission to', method, 'on', repo);
    //   return gitObject.reject(500, "You dont have these permissions");
    // }
  }
};

var checkTriggers = function(method, repo, gitObject) {
  var _base;
  if (repo.onSuccessful != null) {
    if (repo.onSuccessful[method] != null) {
      console.log('On successful triggered: ', method, 'on', repo);
      return typeof (_base = repo.onSuccessful)[method] === "function" ? _base[method](repo, method, gitObject) : void 0;
    }
  }
};

var getUser = function(username, password, repo) {

  //change this should be auth in DB
  return true;
  /*var userObject, _i, _len, _ref;
  crypted_password = crypto.createHash('sha1').update(password).digest('hex');
  _ref = repo.users;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    userObject = _ref[_i];
    if (userObject.user.username === username && (userObject.user.password === password || crypted_password === userObject.user.password)) {
      return userObject;
    }
  }
  return false*/
};

module.exports = {

	git: git,

	repos_init: function(repos){

		var self = this;
		this.git.init(repos);

		repos.on('push', function (push) {

		    console.log('push ' + push.repo + '/' + push.commit
		        + ' (' + push.branch + ')'
		    );

			var repo;
			console.log('Got a PUSH call for', push.repo);
			repo = push.repo;
			var data = {
				status: push.status,
				repo: push.repo,
				service: push.service,
				cwd: push.cwd,
				last: push.last,
				commit: push.commit,
				evName: push.evName,
				branch: push.branch,
				repo_dir: current_proejct
			}
			
			if(data.branch !== current_proejct + '_' + current_user){
				push.reject(500, 'Cannot push this branch');
				// data.new_branch = current_proejct + '_' + current_user;
				self.git.new_branch(data, current_proejct + '_' + current_user);
				self.git.checkout_branch(data, current_proejct + '_' + current_user);
				self.git.push(data, current_proejct + '_' + current_user);
			}

			// console.log(data);
			//repo.last_commit = data;
		    // push.accept();
			if (repo !== false) {
				return processSecurity(push, 'push', repo);
			} else {
				console.log('Rejected - Repo', push.repo, 'doesnt exist');
				return push.reject(500, 'This repo doesnt exist');
			}		    

		});

		repos.on('fetch', function (fetch) {
		    console.log('fetch ' + fetch.commit);
			console.log('Got a INFO call for', fetch.repo);
			console.log(fetch.url)
		    fetch.accept();
		});

		repos.on('info', function (fetch) {
		  var repo;
		  console.log('Got a INFO call for', fetch.repo);
		  console.log(fetch.url)
		  repo = fetch.repo;

			var data = {
				status: fetch.status,
				repo: fetch.repo,
				service: fetch.service,
				cwd: fetch.cwd,
				last: fetch.last,
				commit: fetch.commit,
				evName: fetch.evName,
				branch: fetch.branch
			}
			
			console.log(data);		

		  if(fetch.url.indexOf('receive-pack')>=0)
		  { //originally push if receive-pack
		    if (repo !== false) {
		      if (repo.anonRead === true) {
		        checkTriggers('fetch', repo);
		        return fetch.accept();
		      } else {
		        return processSecurity(fetch, 'fetch', repo);
		      }
		    } else {
		      console.log('Rejected - Repo', fetch.repo, 'doesnt exist');
		      return fetch.reject(500, 'This repo doesnt exist');
		    }
		  }else
		  fetch.accept();

		});

	}
}