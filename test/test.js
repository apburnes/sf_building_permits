var fs = require('fs');
var superagent = require('superagent');
var expect = require('expect.js');
var geojson = require('./test_geo.json');

function testCoords(geojson) {

}

describe('Validating geojson', function() {
	it('Should be a valid json object', function() {
		expect(geojson).to.be.a('object')
		expect(geojson.features).to.be.a('array')
	})
})

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