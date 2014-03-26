


module.exports = {
	io: null,

	init: function(io){
		this.io = io;

		this.io.sockets.on('connetion', function(socket){
			
		});
	},

	// commit data (project_name, commiter, date)
	commit: function(data){
		io.sockets.emit('commit', data);
	}
}