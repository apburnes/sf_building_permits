var fs = require('fs');
var mongoose = require('mongoose');
var config = require('../config.js');
var expect = require('expect.js');
var geojson = JSON.parse(fs.readFileSync('./geo.json'));

mongoose.connect(config.db);
var db = mongoose.connection;
console.log(db)

describe('Validating geojson', function() {
	it('Should be a valid json object', function() {
		expect(geojson).to.be.a('object')
		expect(geojson.features).to.be.a('array')
	});
	it('Should have valid coordinates', function() {
		expect(validCoord(geojson)).to.be.ok();
	})
	it('Each coordinates should have two numbers', function() {
		expect(notTwoCoords(geojson)).not.to.be(true)
	})
});

db.once('open', function() {
	describe('Connecting to the Mongo instance', function() {
		it('Should connect to the localhost', function() {
			expect(db._hasOpened).to.be(true)
		})
		it('Should close on command', function() {
			mongoose.disconnect(function() {
				expect(db._closeCalled).to.be(true)
			})
		})
	})
})


function validCoord(geojson) {
	var features = geojson.features;
	return features.every(function(feature) {
		return feature.geometry.coordinates.every(function(coord) {
			return coord >= -180 && coord <= 180;
		})
	})
}

function notTwoCoords(geojson) {
	var features = geojson.features;
	return features.some(function(feature) {
		return feature.geometry.coordinates.length != 2
	})
}
// describe('Testing SF Permit API server', function() {
// 	var id;

// 	it('should post the permit object', function(done) {
// 		superagent.post('http://localhost:3000/collection/test')
// 			.send({
// 				type: 'Point',
// 				coordinates: [-102, 32]
// 			})
// 			.end(function(e, res) {
// 				expect(e).to.eql(null);
// 				expect(res.body.length).to.eql(1)
//         expect(res.body[0]._id.length).to.eql(24)
//         id = res.body[0]._id
//         done()
// 			})
// 	})
// })