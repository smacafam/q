//express lib
var express = require('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//shop manager
var shopManager = require('./shopManager.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//set to true since we want to parse nested objects in the JSON we receive
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authoriuzation
app.options('*', cors());

/**
 * @brief returns a static welcome page.
 * @return a static page.
 */
app.get('/', function(request, response) {
	var headers = {};
	//answer
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end("Welcome dear customer");
});

/**
 * @brief returns the content pf warehouse
 * @return a static page.
 */
app.get('/showWarehouse', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(shopManager.getWarehouse()));
});

/**
 * @brief search for an item
 * @return search an item using id, size, colour (all of them optionals), if none of them is set it will return the whole warehouse
 */
app.post('/searchItem', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var itemID;
    var itemSize;
    var itemColour
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        //read items
        
        //ItemId
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 itemID = parseFloat(request.body.ID);
		else 
			itemID = null;
        
        //itemSize
        if ( typeof request.body.size !== 'undefined' && request.body.size)
            itemSize = request.body.size;
		else 
			itemSize = null;
        
        //itemColour
        if ( typeof request.body.colour !== 'undefined' && request.body.colour)
            itemColour = request.body.colour;
		else 
			itemColour = null;
        
		//search for items
		var items = shopManager.searchItems(itemID,itemSize,itemColour);
		//if exists
		if (items != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(items));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}
	
	}
	else
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}
    

});

/**
 * @brief sell item
 * @return the sold item, identified by ID, Size and colour, decrese or remove the item if =1
 */
app.post('/sellItem', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var itemID;
    var itemSize;
    var itemColour
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        //ItemId
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 itemID = parseFloat(request.body.ID);
		else 
			itemID = null;
        
        //itemSize
        if ( typeof request.body.size !== 'undefined' && request.body.size)
            itemSize = request.body.size;
		else 
			itemSize = null;
        
        //itemColour
        if ( typeof request.body.colour !== 'undefined' && request.body.colour)
            itemColour = request.body.colour;
		else 
			itemColour = null;
        
        
	
	}
	else
	{
		itemID = null;
	}
    
	var itemSold;
	
    if (itemID!=null && itemColour!=null && itemSize!=null)
	{
		//aceptable input
		//delete sell an item
		itemSold = shopManager.sellItem(itemID,itemColour,itemSize);
		if (itemSold!= null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(itemSold));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
		{
        	//unaceptable input
        	response.writeHead(406, headers);
			response.end(JSON.stringify("1"));
		}   

});

/**
 * @brief restock an item
 * @return add the item to the warehouse, if the item quantity is higher than 10, it will return an error
 */
app.post('/restockItem', function(request, response) 
{	
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var itemID;
	var itemSize;
	var itemType;
	var itemQuantity;
    var itemSeason;
    var itemColour;
    var itemPrice;
    
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID &&
			 typeof request.body.size !== 'undefined' && request.body.size &&
			 typeof request.body.type !== 'undefined' && request.body.type &&
			 typeof request.body.quantity !== 'undefined' && request.body.quantity &&
             typeof request.body.season !== 'undefined' && request.body.season &&
             typeof request.body.price !== 'undefined' && request.body.price &&
             typeof request.body.colour !== 'undefined' && request.body.colour
		   )
            {
			 itemID = parseFloat(request.body.ID);
			 itemSize = request.body.size;
			 itemType = request.body.type;
			 itemQuantity = parseFloat(request.body.quantity);
             itemSeason = parseFloat(request.body.season);
             itemPrice = parseFloat(request.body.price);
             itemColour = request.body.colour;
            }
		else 
			itemID = "undefined";
	}
	else
	{
		itemID = "body undefined";
	}
    
    if (itemID!="undefined" && itemID!="body undefined")
	{
		//aceptable input
		//create the item
		var item =  
            {
                ID: itemID,
                type: itemType,
                size: itemSize,
                quantity: itemQuantity,
                colour: itemColour,
                season: itemSeason,
                price: itemPrice
            };
		
		//if insertion works correctly
		if (shopManager.restockItem(item))
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(item));
		}
		else
		{
			response.writeHead(400, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

//ADD YOUR CODE BELOW THIS COMMENT, IF IT IS POSSIBLE


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});