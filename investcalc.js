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
var bitcoin_amt = 0;
var currentWorth = 0;

//Set max and placeholder value of date input field to yesterday's date default
window.onload = function() {
	document.getElementById("date_field").setAttribute("value", yesterday);
	document.getElementById("date_field").setAttribute("max", yesterday);
}

//import our bitcoin current price data from JSON
let currentPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
let request = new XMLHttpRequest();

//import our bitcoin closing price data from JSON
let closingPriceURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-18&end=' + yesterday;
let request2 = new XMLHttpRequest();

request.onload = function() { //Run after requests are fetched from JSON URL
    const btcPriceData = request.response; //get our json object for btc current price
	usdPrice = btcPriceData.bpi.USD.rate; //Grab Current USD price from JSON object

}

request2.onload = function() { //Run after requests are fetched from JSON URL 
	const closingPriceData = request2.response; //Get our JSON object for BTC Closing price
	closingPrice = closingPriceData.bpi[search_date]; //Get closing price of BTC on date user searched
	bitcoin_amt = (invest_amt/closingPrice); //Amount of Bitcoin bought on date
}

//Calculate and print return on investment
function calcROI() {
	invest_amt = document.getElementById("invest_field").value;	
	search_date = document.getElementById("date_field").value;

	request.open('GET', currentPriceURL);
	request.responseType = 'json';
	request.send();

	request2.open('GET', closingPriceURL);
	request2.responseType = 'json';
	request2.send();
	console.log("btc_amt = " + bitcoin_amt + " current price + " + usdPrice);
	currentWorth = (parseFloat(bitcoin_amt)*parseFloat(usdPrice));

	console.log("On " + search_date + " the price of BTC closed at $" + closingPrice);
	console.log("The price of BTC right now is $" + usdPrice + "/BTC\nYou bought " + bitcoin_amt + "/BTC for $" +
	invest_amt + " and it's now worth $" + currentWorth);
}
