var commandsImport = require('./commands.js');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  //process.stdout.write('You typed: ' + cmd);  
  //process.stdout.write("commandsImport is undefined? " + typeof commandsImport + "\n");//[cmd]());
  commandsImport.commands(cmd);
});