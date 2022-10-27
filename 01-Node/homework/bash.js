 const comandos = require('./commands/index.js');
     //Output un prompt
    process.stdout.write('prompt > ');
     //El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
    	var args = data.toString().trim().split(' ');
      var cmd = args.shift(); // remueve la nueva línea
      if ( comandos[cmd]){
       comandos[cmd](args)
   }else {
   process.stdout.write(`${cmd} not found`)   
}
   process.stdout.write('\nprompt > ');
});