var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	console.log(db._hasOpened)
});

// var fs = require('fs');

// fs.readFile("./geo.json", 'utf8', function(err, data) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		var result = {
// 			type: 'FeatureCollection',
// 		};
// 		console.log(sliceObj(data, result, [0,10])())
// 	}
// })

// function sliceObj(data, newObj, idRange) {
// 	var geoJson = JSON.parse(data);
// 	var sliced = geoJson.features.slice(idRange[0], idRange[1]);
// 	return function() {
// 		newObj.features = sliced;
// 		var strSlice = JSON.stringify(newObj);
// 		return saveSlice("./test_geo.json", strSlice);
// 	}
// }

// function saveSlice(outFile, data) {
// 	return fs.writeFile(outFile, data, function (err) {
// 		if (err) {
// 			console.log(err)
// 		}
// 		console.log("File has been written.")
// 	})
// }

