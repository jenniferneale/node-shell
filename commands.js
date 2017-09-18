module.exports = commands;
var fs = require('fs');

function commands(input){	
	var spaceIndex = input.indexOf(" ");
	var cmd = input.slice(0,(spaceIndex == -1)? undefined: spaceIndex);
	var args = input.slice(spaceIndex+1);
	var output = '';
	//output += "Cmd: " + cmd;
	switch(cmd){
		case "pwd":
			output+= '\npwd: ' + process.cwd();
			break;
		case "date":
			output+= '\ndate: ' + Date();
			break;
		case "ls":			
			fs.readdir('.', function(err, files) {
				if (err) throw err;
				files.forEach(function(file) {
					process.stdout.write (file.toString() + "\n");					
				});
			});
			break;
		case "echo"://IF THERE'S TIME, ALSO EMULATE ABILITY TO PRINT ENVIRONMENT VARIABLES SUCH AS PATH'
			output += args;
			break;
		case "cat":
			//print file contents
			fs.readFile(args,"utf8",function(err, data) {
				if (err) throw err;
				process.stdout.write(data);		
				});
			break;
		case "head":
			//print first 5 lines of file contents			
			fs.readFile(args,"utf8",function(err, data) {
				if (err) throw err;				
				var dsplit = data.split("\n");
				process.stdout.write(dsplit.slice(0,5).join("\n"));
				});
			//result has to be inside asynchronous callback function
			break;
		case "tail":
			//print last 5 lines of file contents
			fs.readFile(args,"utf8",function(err, data) {
				if (err) throw err;				
				var dsplit = data.split("\n");
				process.stdout.write(dsplit.slice(-5).join("\n"));
				});
			break;
		default:
			output += "Invalid input";
			break;
	}	
	//process.stdout.write("prompt > ");
	output += '\nprompt > ';
	//process.stdout.write(output);
	return output;
}

