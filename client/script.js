$(document).ready(function()
{	
	//var baseAddress = "https://polar-coast-16373.herokuapp.com"
	var baseAddress = "http://127.0.0.1:5000"; 
	//post + Json
	$("#btn1").click(function(){
		$.post(baseAddress + "/searchItem",
		{
			ID: 1,
            size : "S",
            colour: "blue"
		},
		function(data, status){
			alert(" Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn2").click(function(){
		$.post(baseAddress + "/sellItem",
		{
			ID: 1,
            size : "S",
            colour: "blue"
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n type: " + data.type +
				  "\n size: " + data.size +
				  "\n quantity: " + data.quantity +
                  "\n colour: " + data.colour +
                  "\n price: " + data.price +
                  "\n season: " + data.season +
				  "\n Status: " + status);
		},
		"json");
	});   
    
	$("#btn3").click(function(){
		$.post(baseAddress + "/restockItem",
		{
                ID: 4,
                type: "shirt",
                size: "M",
                quantity: 2,
                colour: "white",
                season: 2017,
                price: 100
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n type: " + data.type +
				  "\n size: " + data.size +
				  "\n quantity: " + data.quantity +
                  "\n colour: " + data.colour +
                  "\n price: " + data.price +
                  "\n season: " + data.season +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn4").click(function(){
		$.post(baseAddress + "/sales",
		{
			discount: 40,
			year: 2016
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
		
	$("#btn5").click(function(){
		$.post(baseAddress + "/sales",
		{
			discount: 100,
			year: 2016
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn6").click(function(){
		$.post(baseAddress + "/sales",
		{
			discount: 60,
			year: 2017
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
});