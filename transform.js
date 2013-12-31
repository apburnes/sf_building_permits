var fs = require('fs'),
		csv = require('csv'),
		osm = require('osmgeocoder'),
		data_dir = __dirname + '/raw_data';

fs.readdir(data_dir, function(err, files) {
	if (err) {
		console.log('Error: ' + err);
	}
	readCsv(files[0])
})

function readCsv(file) {
	geojson = [];
	keys = [];
	csv()
	.from.stream(fs.createReadStream(__dirname + '/raw_data/' + file))
	.transform(function(row, index) {
		if (index < 10) {
			return row.slice(1, row.length);
		}
	})
	.on('record', function(row, index) {
		var feature = {
					properties: {},
					geometry:{}
				},
				address = row[37] + " San Francisco, CA";
		if(index === 0) {
			row.map(function(x) {
				keys.push(x)
			})
		}
		else {
			for(var i = 0; i < row.length; i++) {
				var key = keys[i];
				feature['properties'][key] = row[i];
			}
			geojson.push(feature);
		}
	})
	.on('end', function(count) {
		osmGeocode(geojson);
	})
}

function osmGeocode(geojson) {
	geojson.map(function(item) {
		var address = item.properties.ADDRESS + ' San Francisco, CA';
		osm.geocode(address, function(err, res) {
			if (err) {
				console.log(err);
			}
			else {
				item.geometry['type'] = 'Points';
				if (res.length == 1) {
					item.geometry['coordinates'] = [res[0].lon, res[0].lat];
				} else {
					item.geometry['coordinates'] = [];
				}
			}
			console.log(item);
		});
	})
}