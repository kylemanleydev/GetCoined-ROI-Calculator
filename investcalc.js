//Get Date of Yesterday
var date = new Date();
date.setDate(date.getDate()-1); //Get Date of Yesterday
var yyyy = date.getFullYear(); //Get Year 
var mm = date.getMonth()+1; //Get Month +1 because months are (0-11)
var dd = date.getDate(); //Get Day
var date = new Date();
date.setDate(date.getDate()-1); //Get Date of Yesterday
var yyyy = date.getFullYear(); //Get Year 
var mm = date.getMonth()+1; //Get Month +1 because months are (0-11)
var dd = date.getDate(); //Get Day
//Add leading '0' before months and days below '10'
if (mm < 10) {
	mm = '0' + mm
}
if (dd < 10) {
	dd = '0' + dd
}
var yesterday = yyyy+'-'+mm+'-'+dd; //Get Yesterday in YYYY/MM/DD format

//Set max and placeholder value of date input field to yesterday's date default
window.onload = function() {
	document.getElementById("date_field").setAttribute("value", yesterday);
	document.getElementById("date_field").setAttribute("max", yesterday);
}

//Calculate and print return on investment
function calcROI() {
	var invest_amt = document.getElementById("invest_field").value;	
	var	search_date = document.getElementById("date_field").value;
	
	var p = new Promise(function(resolve, reject){
		//import our bitcoin current price data from JSON
		var currentPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
		var request = new XMLHttpRequest();
		request.open('GET', currentPriceURL);
		request.responseType = 'json';
		request.send();
		request.onload = function() { //Run after requests are fetched from JSON URL
			var btcPriceData = request.response; //get our json object for btc current price
			var	usdPrice = btcPriceData.bpi.USD.rate; //Grab Current USD price from JSON object
			console.log("request1 loaded");
		}

		//import our bitcoin closing price data from JSON
		var closingPriceURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-18&end=' + yesterday;
		var request2 = new XMLHttpRequest();
		request2.open('GET', closingPriceURL);
		request2.responseType = 'json';
		request2.send();
		request2.onload = function() {
		var closingPriceData = request2.response; //Get our JSON object for BTC Closing price
		var closingPrice = closingPriceData.bpi[search_date]; //Get closing price of BTC on date user searched
		var bitcoin_amt = (invest_amt/closingPrice); //Amount of Bitcoin bought on date
		console.log("inner request2 loaded");
		}
		resolve("Promise finished, we have closing & current price data");
	});
	console.log(p);

	p.then(function(val){
		console.log(val);
		
		console.log("btc_amt = " + bitcoin_amt + " current price + " + usdPrice);
		var currentWorth = (parseFloat(bitcoin_amt)*parseFloat(usdPrice));

		console.log("On " + search_date + " the price of BTC closed at $" + closingPrice);
		console.log("The price of BTC right now is $" + usdPrice + "/BTC\nYou bought " + bitcoin_amt + "/BTC for $" +
		invest_amt + " and it's now worth $" + currentWorth);
	});
}
