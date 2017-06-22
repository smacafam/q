//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showList
describe("Test /showWarehouse", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showWarehouse/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});
 
// Test for /searchItem
describe("Test /searchItem", function() {
	//set the data
	var data = {
			ID: 1,
            size : "S",
            colour: "blue"
		};
	
	//legal request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "searchItem/", data, function(err, res, body) {
		expect(body).toEqual([
			{
                ID: 1,
                type: "trausers",
        		size: "S",
                quantity: 2,
                colour: "blue",
                price: 11,
                season: 2017
	}]
		);

		done();
	  });
	});

	//item non existing
	data1 = {ID: "10" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchItem/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	

});