

var git = require('nougit/git');

module.exports = {
	//projects directory.
	projects_dir: '/home/pcs/test',
	git: git,

	init: function(repos){
		// this.repository_dir = repos.dirMap;
		// console.log('hi',this.repository_dir, repos);
	},

	commit: function(data){
		this.git.commit(this.projects_dir + '/' + data.repo_dir, data.msg);
	},

	checkout_branch: function(data, branch, callback){
		this.git.checkout(this.projects_dir + '/' + data.repo_dir, branch);
		if(callback){
			callback();
		}
	},

	new_remote: function(data){
		this.git.remote.add(this.projects_dir + '/' + data.repo_dir, data.remote, data.url);
	},

	new_branch: function(data, branch){
		this.git.branch(this.projects_dir + '/' + data.repo_dir, branch, this.checkout_branch(data, branch, this.push(data, branch)));
	},

	merge_branch: function(data){
		this.git.merge(this.projects_dir + '/' + data.repo_dir, data.branch);
	},

	push: function(data, branch){
		this.git.push(this.projects_dir + '/' + data.repo_dir, data.remote, branch)
	}
}