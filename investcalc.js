//Get Date of Yesterday
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

//Global variables
var currentPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json'; //Current BTC Price URL
var request = new XMLHttpRequest(); //Request for current Price
var closingPriceURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-18&end=' + yesterday; //Historic BTC data URL
var request2 = new XMLHttpRequest(); //Request2 for date invested in BTC closing price
var btcPriceData = 0;
var usdPrice = 0;
var closingPriceData = 0;
var closingPrice = 0;
var bitcoin_amt = 0;
var current_worth = 0;
var percent_change = 0;
var ROI_final = 0;
var usingLastClosing = false;
var lastClosingDate = '';

//Calculate and print return on investment
function calcROI() {
	var invest_amt = document.getElementById("invest_field").value;	
	var	search_date = document.getElementById("date_field").value;

	//Create promise and use AJAX to request current BTC price
	const requestDataOne = new Promise((resolve, reject) => {
	request.open('GET', currentPriceURL, true);
	request.responseType = 'json';
	request.send(); 
	request.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		btcPriceData = request.response; //Get our json object for BTC current price
		usdPrice = btcPriceData.bpi.USD.rate; //Grab Current USD price from JSON object
		usdPrice = parseFloat(usdPrice.replace(/,/g, '')); //Remove comma and convert String to float 
		resolve('data one taken');
	  }
	};
	})

	//Create promise and use AJAX to request historic BTC data and get closing price of BTC on date user searched
	const requestDataTwo = new Promise((resolve, reject) => {
	request2.open('GET', closingPriceURL, true);
	request2.responseType = 'json';
	request2.send();
	request2.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		closingPriceData = request2.response; //Get our JSON object for BTC Closing price
		closingPrice = closingPriceData.bpi[search_date]; //Get closing price of BTC on date user searched
		if(closingPrice == undefined){
			usingLastClosing = true;
			lastClosingDate = Object.keys(closingPriceData.bpi)[Object.keys(closingPriceData.bpi).length-1];
			closingPrice = closingPriceData.bpi[lastClosingDate];
		} else {
			usingLastClosing = false;
		}
		resolve('data two taken');
	  }
	};
	})
	
	//Run after both Promises have been fulfilled
	Promise.all([requestDataOne,requestDataTwo]).then((messages) => {
		bitcoin_amt = (invest_amt/closingPrice); //Amount of Bitcoin bought on date
		current_worth = (bitcoin_amt*usdPrice); //Get value of user's Bitcoins
		percent_change = (current_worth/invest_amt); //Calc percentage fluxuation
		ROI_final = (current_worth-invest_amt); //Calc final ROI value
		const [yyyy, mm, dd] = search_date.split('-'); //Parse search_date into 3 variables
		const date_searched = [mm, dd, yyyy].join('/'); //join variables to get MM/DD/YYYY
		usdPrice = usdPrice.toFixed(2);	//Format decimals for printing
		closingPrice = closingPrice.toFixed(2);
		bitcoin_amt = bitcoin_amt.toFixed(8);
		invest_amt = parseFloat(invest_amt).toFixed(2);
		percent_change = percent_change.toFixed(2); 
		ROI_final = ROI_final.toFixed(2);
		if(ROI_final < 0) {
			percent_change = '-'+percent_change; //Make percent_change show negative when ROI < 0
			ROI_final = "-$"+ROI_final.replace(/-/g, ''); //Add "-$" before final ROI and del old '-' with regex
		} else {
			ROI_final = '$'+ROI_final; //Add '$' before final ROI
		}
		
		//Set colors of table and cells	
		document.getElementById("ROI_Calc_Table").style.color = "#1E1E1E";
		document.getElementById("ROI_Calc_Table").style.borderColor = "#1E1E1E";
		const cells = document.getElementsByClassName("cell");
		for(var i = 0; i < cells.length; i++) {
			cells[i].style.borderColor = "#1E1E1E";	
		}

		//Set table rows and columns
		document.getElementById("r1-c1").innerHTML = "Current Price BTC";
		document.getElementById("r1-c2").innerHTML = '$'+usdPrice+"/BTC";
		if(usingLastClosing){
			const [yyyy, mm, dd] = lastClosingDate.split('-'); //Parse lastClosingDate into 3 variables
			const date_last_closed = [mm, dd, yyyy].join('/'); //join variables to get MM/DD/YYYY
			document.getElementById("date_field").value = lastClosingDate;
			document.getElementById("table_hint").innerHTML = "*No BTC closing price data for "+date_searched+" using latest closing price from "+date_last_closed;
			document.getElementById("r2-c1").innerHTML = "Closing Price of BTC on "+date_last_closed;
		}
		else {
			document.getElementById("table_hint").innerHTML = '';
			document.getElementById("r2-c1").innerHTML = "Closing Price of BTC on "+date_searched;
		}
		document.getElementById("r2-c2").innerHTML = '$'+closingPrice+"/BTC";
		document.getElementById("r3-c1").innerHTML = "Amount of BTC purchased with $"+invest_amt;
		document.getElementById("r3-c2").innerHTML = bitcoin_amt+" BTC";
		document.getElementById("r4-c1").innerHTML = "Return on Investment";
		document.getElementById("r4-c2").innerHTML = percent_change+'%';
		document.getElementById("r5-c1").innerHTML = "Gross Profit";
		document.getElementById("r5-c2").innerHTML = ROI_final;
	})
}
