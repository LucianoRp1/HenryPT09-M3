const fs = require('fs');

module.exports = { 
	 pwd: function() {
	 	process.stdout.write(process.cwd());
	 },
    date: function() {
    	process.stdout.write(Date());
    },
    ls: function(){
    	fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
  process.stdout.write("prompt > ");
});
    },
    echo: function (args){
    	process.stdout.write(args.join(' '));
    }


}