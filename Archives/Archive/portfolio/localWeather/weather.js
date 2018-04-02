 $(document).ready(function() {
if (navigator.geolocation) {    navigator.geolocation.getCurrentPosition(function(position) {
	//Get coordinates
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	$("#data").html("latitude: " + lat + "<br>longitude: " + lon);
	//Turn coordinates into city, state, country
	$.ajax({
	    type: "GET",
	    url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyCsqQcZtFHg2Q1ZCAP6NKtUsG7vODxUSWk",
	    dataType: "json",
	    success: (function(data){
    	processJSON(data);
  	})
	});
  	function processJSON(json) {
    $("#location").html("<strong>" + json.results[0].address_components[3].long_name + ", " + json.results[0].address_components[5].long_name + ", " + json.results[0].address_components[6].short_name + "</strong>");
  	}
	
	//Get weather
	$.getJSON("https://api.darksky.net/forecast/e129b2486f4da8c8e596d4cf1aab13f0/"+ lat + "," + lon + "?callback=?", function(forecast) {
		console.log(forecast);
		var temp = forecast.currently.apparentTemperature;
		var currentTempF = Math.round(temp);
		var currentTempC = Math.round((currentTempF - 32)*5/9);
		var sum = forecast.currently.summary;
		var summary = sum.toLowerCase();
		var hi = forecast.daily.data[0].temperatureMax;
		var highF = Math.round(hi);
		var highC = Math.round((highF - 32)*5/9);
		var lo = forecast.daily.data[0].temperatureMin;
		var lowF = Math.round(lo);
		var lowC = Math.round((lowF - 32)*5/9);
		var hu = forecast.daily.data[0].humidity;
		var humidity = Math.round(hu * 100);
		$("#temp").html(currentTempF + "&deg;F");
		$("#summary").html("The weather is " + summary);
		$("#high").html(highF + "&deg;F");
		$("#low").html(lowF + "&deg;F");
		$("#humidity").html(humidity + "%");
		var con = "F";
		$("#converter").on("click", function() {
			switch(con) {
				case "F":
					$("#temp").html(currentTempC + "&deg;C");
					$("#high").html(highC + "&deg;C");
					$("#low").html(lowC + "&deg;C");
					$("#converter").removeClass("wi-celsius");
					$("#converter").addClass("wi-fahrenheit");
					con = "C";
				break;
				case "C":
					$("#temp").html(currentTempF + "&deg;F");
					$("#high").html(highF + "&deg;F");
					$("#low").html(lowF + "&deg;F");
					$("#converter").removeClass("wi-fahrenheit");
					$("#converter").addClass("wi-celsius");
					con = "F";
				break;
			};
		});
		//Get/set icons
		var currentIcon = forecast.currently.icon;
		if (currentIcon == "clear-day") {
			$("#weather-icon").addClass("wi wi-day-sunny");
			$("body").addClass("day-clear");
		} else if (currentIcon == "clear-night") {
			$("#weather-icon").addClass("wi wi-night-clear");
			$("body").addClass("night-clear");
		} else if (currentIcon == "rain") {
			$("#weather-icon").addClass("wi wi-rain");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "snow") {
			$("#weather-icon").addClass("wi wi-snow");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "sleet") {
			$("#weather-icon").addClass("wi wi-sleet");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "wind") {
			$("#weather-icon").addClass("wi wi-strong-wind");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "fog") {
			$("#weather-icon").addClass("wi wi-fog");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "cloudy") {
			$("#weather-icon").addClass("wi wi-cloudy");
			$("body").addClass("day-clear");
		} else if (currentIcon == "partly-cloudy-day") {
			$("#weather-icon").addClass("wi wi-day-cloudy");
			$("body").addClass("day-clear");
		} else if (currentIcon == "partly-cloudy-night") {
			$("#weather-icon").addClass("wi wi-night-cloudy");
			$("body").addClass("night-clear");
		} else if (currentIcon == "hail") {
			$("#weather-icon").addClass("wi wi-hail");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "thunderstorm") {
			$("#weather-icon").addClass("wi wi-thunderstorm");
			$("body").addClass("grey-sky");
		} else if (currentIcon == "tornado") {
			$("#weather-icon").addClass("wi wi-tornado");
			$("body").addClass("grey-sky");
		} else {
			$("#weather-icon").addClass("wi wi-na");
			$("body").addClass("day-clear");
		};
	});
});
};
});


  