

var git = require('nougit/git');

module.exports = {
	repository_dir: null,
	git: git,

	init: function(repos){
		this.repository_dir = repos.dirMap;
		console.log(tihs.repository_dir);
	},

	commit: function(data){
		this.git.commit(repository_dir + '/' + data.repos, data.msg);
	},

	checkout_branch: function(data){
		this.git.checkout(repository_dir + '/' + data.repos, data.branch);
	},

	new_remote: function(data){
		this.git.remote.add(repository_dir + '/' + data.repos, data.remote, data.url);
	},

	new_branch: function(data){
		this.git.branch(repository_dir + '/' + data.repos, data.branch);
	},

	merge_branch: function(data){
		this.git.merge(repository_dir + '/' + data.repos, data.branch);
	}
}