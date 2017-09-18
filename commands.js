var fs = require('fs');
var request = require('request');

function getCmd(input){
	var spaceIndex = input.indexOf(" ");
	return input.slice(0,(spaceIndex == -1)? undefined: spaceIndex);	
}

function getArgs(input){
	var spaceIndex = input.indexOf(" ");
	return input.slice(spaceIndex+1);
}

module.exports = {

	commands: function (input){
		var cmd = getCmd(input);
		var args = getArgs(input);
		
		var done = function(outputString){
		process.stdout.write(outputString);
		};				

		var obj = {
	
			pwd: function(file){
				done('\npwd: ' + process.cwd());
			},
			date: function(file){
				done('\ndate: ' + Date());
			},

			ls: function(file){
				var output;
				fs.readdir('.', function(err, files) {
						if (err) throw err;
						files.forEach(function(file) {
							output += file.toString() + "\n";					
						});
						done(output);
					});	
			},

			echo: function(file){ //IF THERE'S TIME, ALSO EMULATE ABILITY TO PRINT ENVIRONMENT VARIABLES SUCH AS PATH'
				done(getArgs());
			},

			cat: function(file){
				//var output;
				fs.readFile(args,"utf8",function(err, data) {
						if (err) throw err;
						done(data);		
				});
			},

			head: function(file){
				//print first 5 lines of file contents			
					fs.readFile(args,"utf8",function(err, data) {
						if (err) throw err;				
						var dsplit = data.split("\n");
						done(dsplit.slice(0,5).join("\n"));
					});
			},

			tail: function(file){
				fs.readFile(args,"utf8",function(err, data) {
					if (err) throw err;				
					var dsplit = data.split("\n");
					done(dsplit.slice(-5).join("\n"));
				});
			},

			sort: function(file){
				fs.readFile(args,"utf8",function(err, data) {
					if (err) throw err;				
					var dsplit = data.split("\n");
					done(dsplit.sort().join("\n"));
					});
			},

			wc: function(file){
				fs.readFile(args,"utf8",function(err, data) {
						if (err) throw err;				
						var dsplit = data.split("\n");
						done(dsplit.length.toString());
						});
			},

			uniq: function(file){
				fs.readFile(args,"utf8",function(err, data) {
						if (err) throw err;				
						var dsplit = data.split("\n").sort();
						var outputArr = [];				
						for(var i=0; i < dsplit.length; i++){
							var isUnique = true;
							for(var j=i+1; j<dsplit.length; j++){						
								if(dsplit[i] === dsplit[j]){
									isUnique = false;
									break;
								}						
							}
							if(isUnique) outputArr.push(dsplit[i]);
						}
						done(outputArr.join("\n"));
						});
			},

			curl: function(file){
				request(args, function (error, response, body) {			  
						if(error) throw error;
						done(body);
					});
			}

		}//end of commands object

		

		obj[cmd]();
		return "fred";
	}//end of wrapper function

}//end of wrapper object