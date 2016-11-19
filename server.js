var express = require('express');
// var bodyParser = require('body-parser'); //deprecated see https://www.reddit.com/r/node/comments/406bih/parsing_reqbody_without_bodyparser/
var app     = express();
var dbFile	= 'stem/db.txt';

//app.use(bodyParser()); //deprecated

app.get('/register_names', function(req, res) {
	var fs = require('fs');
	var data = req.query;
	if(data.hasOwnProperty("names")){
		var names = data["names"].split(',');
		var isNonAlpha = /^[^a-zA-Z,]*$/.test(names);
		if(isNonAlpha){
			res.end("Foutieve input: " + names[0]);
		}
		else{
			//clean file
			fs.writeFile(dbFile, '', encoding='utf8');

			for(var i = 0; i < names.length; i++){
				fs.appendFile(dbFile, names[i] + '\n', encoding='utf8');
			}
			res.end("De volgende namen zijn toegevoegd: " + names);
		}
	}
	//shouldn't get here but just to be sure.
  res.end("Er is iets fouts gegaan, contact de programmeur. register_names=names? ingevuld? Zo niet, dan kom je hier :)");
});

app.use('/stem', express.static(__dirname + '/stem'));

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});