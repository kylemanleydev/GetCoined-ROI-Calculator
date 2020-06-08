//import our bitcoin data from JSON
let requestURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    const btcPriceData = request.response; //Get our JSON object
	console.log(btcPriceData);

	var usdPrice = btcPriceData.bpi.USD.rate; //Grab Current USD price from JSON object
    console.log(usdPrice);	
}

window.onload = function() {
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
	document.getElementById("date_field").setAttribute("value", yesterday);
	document.getElementById("date_field").setAttribute("max", yesterday);
}
