
var fs = require('fs');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

module.exports = {

	root_id: 'root',
	root_pw: 'ehowlsus14',

	init: function(repos){
		// this.repository_dir = repos.dirMap;
		// console.log('hi',this.repository_dir, repos);
	},

	repository: function(path) {
		// does the path exist
		if (fs.existsSync(path)) {
			// get directory contents
			var contents = fs.readdirSync(path);
			// iterate over contents
			for (var item = 0; item < contents.length; item++) {
				// if the current item is .git
				if (contents[item] === '.git') {
					// move to dir
					process.chdir(path);
					console.log('"' + process.cwd() + '" is a valid Git repository. Switched to directory.');
					return true;
				// if current item is not .git
				} else {
					// if item is last in set
					if (contents[item] === contents[contents.length - 1]) {
						console.log('"' + path + '" is not a valid Git repository.')
						return false;
					}
				}
			}
		// return false if path invalid
		} else {
			return false;
		}
		process.chdir(back);
	},

	checkout: function(path, branch, callback) {
		if (this.repository(path)) {
			exec('git checkout ' + branch, function(err, stdout, stderr) {

				if ((stdout) || stderr.indexOf('Switched') > -1) {
					if (callback) {
						process.chdir(back);
						callback.call(this, {
							message : (stdout) || (stderr)
						});
					}
				} else if (err || stderr) {
					console.log(err || stderr);
					if (callback) {
						process.chdir(back);
						callback.call(this, {
							error : err || stderr
						});
					}
				}  
			});
		} else {
			if(callback){
				callback.call(this, {
					error : 'Invalid repository'
				});
			}
		}
	},

	branch: function(path, branchname, callback) {
		if (this.repository(path)) {
			exec('git branch "' + branchname + '"', function(err, stdout, stderr) {
				if (err || stderr) {
					console.log(err || stderr);
					if (callback) {
						process.chdir(back);
						callback.call(this, {
							error : err || stderr
						});
					}
				// all is good
				} else {
					if (callback) {
						process.chdir(back);
						callback.call(this, {
							message : 'Branch ' + branchname + ' created'
						});
					}
				}
			});
		} else {
			if(callback){
				callback.call(this, {
					error : 'Invalid repository'
				});
			}
		}
	},

	push: function(path, remote, branch, callback) {
		var self = this;
		console.log('log push : ', path, remote, branch);
		// var cmd = 'git push -u ' + ((remote) ? remote : '') + ' ' + ((branch) ? branch : '');

		// if (this.repository(path)) {
		// 	var child = spawn('git', ['push', '-u', ((remote) ? remote : ''), ((branch) ? branch : '')], { stdio: [process.stdin, process.stdout, process.stderr] });
		// 	// console.log(child);
		// 	setTimeout(function(){
		// 		// console.log('id input\n',self.root_id+'\n');
		// 		child.stdin.write('\n');
		// 		setTimeout(function(){
		// 			// console.log('password input\n', self.root_pw+'\n');
		// 			child.stdin.write('\n');
		// 		},1000);
		// 	}, 1000);

		// 	child.stdout.on('data', function (data) {
		// 		console.log('stdout: ' + data);
		// 		if(callback){
		// 			callback.call(this, {
		// 				stdout : data
		// 			});
		// 		}	
		// 	});

		// 	child.stderr.on('data', function (data) {
		// 		console.log('stderr: ' + data);
		// 		if(callback){
		// 			callback.call(this, {
		// 				stderr : data
		// 			});
		// 		}	
		// 	});
		
		// }else{
		// 	if(callback){
		// 		callback.call(this, {
		// 			error : 'Invalid repository'
		// 		});
		// 	}			
		// }
	}
}