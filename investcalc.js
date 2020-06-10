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

//Global Variables
var usdPrice = 0;
var closingPrice = 0;
var	invest_amt = 0;
var search_date = '';

//Set max and placeholder value of date input field to yesterday's date default
window.onload = function() {
	document.getElementById("date_field").setAttribute("value", yesterday);
	document.getElementById("date_field").setAttribute("max", yesterday);
}

//Calculate and print return on investment
function calcROI() {
	invest_amt = document.getElementById("invest_field").value;	
	search_date = document.getElementById("date_field").value;

	//import our bitcoin current data from JSON
	let currentPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
	let request = new XMLHttpRequest();
	request.open('GET', currentPriceURL);
	request.responseType = 'json';
	request.send();
	
	console.log(request.response);

	//import our bitcoin closing price data from JSON
	let closingPriceURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-18&end=' + yesterday;
	let request2 = new XMLHttpRequest();
	request2.open('GET', closingPriceURL);
	request2.responseType = 'json';
	request2.send();

	console.log("On " + search_date + " the price of BTC closed at $" + closingPrice
	+ "\nthe price of BTC right now is $" + usdPrice + "/BTC\nYou spent $" + invest_amt + " on BTC");
}

request.onload = function() { //Run after requests are fetched from JSON URL
    const btcpricedata = request.response; //get our json object for btc current price
	console.log(btcpricedata);

	usdPrice = btcPriceData.bpi.USD.rate; //Grab Current USD price from JSON object
    console.log(usdPrice);	
}

request2.onload = function() { //Run after requests are fetched from JSON URL 
	const closingPriceData = request2.response; //Get our JSON object for BTC Closing price
	console.log(closingPriceData);
}
