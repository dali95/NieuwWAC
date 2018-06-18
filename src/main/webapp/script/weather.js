$(document).ready(function(){
	
	
	initPage();
	

	
	
});






function initPage() {

    $.getJSON("http://ip-api.com/json/?callback=?", function (data) {


        document.getElementById("landcode").innerHTML = data.countryCode;
        document.getElementById("land").innerHTML = data.country;
        document.getElementById("regio").innerHTML = data.region;
        document.getElementById("stad").innerHTML = "<div class=\"stad\" onclick= 'weather(\"" + data.lat + "\", \"" + data.lon + "\", \"" + data.city + "\");'>" + data.city + "</div>";
        document.getElementById("postcode").innerHTML = "code: " + data.zip;
        document.getElementById("lat").innerHTML = data.lat;
        document.getElementById("lon").innerHTML = data.lon;
        document.getElementById("ip").innerHTML = data.query;


        $('#location').append(data.city);



        weather(data.lat, data.lon, data.city);


        loadCountries();

    }, "json");
}


	function deleteLand(code){

          try{
                  $.ajax("/restservices/countries/"+code,{
                      type: "delete",
                      beforeSend: function (xhr) {
                          var token = window.sessionStorage.getItem("sessionToken");
                          xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);

                      },

                              success: function(response){
								messageWindow("Land is verwijdert", "green");
                                  loadCountries();


                      },
                      error: function(response){
                      	messageWindow("Je bent niet ingelogd, log eerst in ", "red");


                      }
                  });
              }
              catch(err){
                  messageWindow("Server fout: " + response.response, "red");

              }

    }

function weather(latitude, longtitude,city){

	
	if(window.sessionStorage.getItem(city) != null){
		

		var arrayCity = JSON.parse(window.sessionStorage.getItem(city));
		

		data = arrayCity.jsondata;
		date = arrayCity.datum;

		
		

		
		if(tenMinutesAgo(date) == true){
		
			
			$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&q="+city+"&units=metric"+
						"&APPID=07d2b5528b659dc8ccdbee6dac06ea40", function(data){


				

				document.getElementById("temperatuur").innerHTML = data.main.temp + " \u00b0C";
				document.getElementById("luchvochtigheid").innerHTML = data.main.humidity + "%";
				document.getElementById("windsnelheid").innerHTML = (data.wind.speed /3.6) + "m/s";
				document.getElementById("windrichting").innerHTML = degToCard(data.wind.deg);
				document.getElementById("zonsopgang").innerHTML = stringToTime(data.sys.sunrise);
				document.getElementById("zonsondergang").innerHTML = stringToTime(data.sys.sunset);
				document.getElementById("location").innerHTML = (data.name);
				


				
				var requestDate = new Date();

				var array = {};
				
				array.jsondata = data;
				array.datum = requestDate;
				
				
				
	
				
				
				
				

				window.sessionStorage.setItem(city, JSON.stringify(array));

			},"json");
			
		}	
		
		

			
		else{

			document.getElementById("temperatuur").innerHTML = data.main.temp + " \u00b0C";
			document.getElementById("luchvochtigheid").innerHTML = data.main.humidity + "%";
			document.getElementById("windsnelheid").innerHTML = (data.wind.speed /3.6) + "m/s";
			document.getElementById("windrichting").innerHTML = degToCard(data.wind.deg);
			document.getElementById("zonsopgang").innerHTML = stringToTime(data.sys.sunrise);
			document.getElementById("zonsondergang").innerHTML = stringToTime(data.sys.sunset);
			document.getElementById("location").innerHTML = (data.name);
			

			
		}		
	}
	
	
	

	
	else{


		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&q="+city+"&units=metric"+
				"&APPID=07d2b5528b659dc8ccdbee6dac06ea40", function(data){


		
		

		document.getElementById("temperatuur").innerHTML = data.main.temp + " \u00b0C";
		document.getElementById("luchvochtigheid").innerHTML = data.main.humidity + "%";
		document.getElementById("windsnelheid").innerHTML = (data.wind.speed /3.6) + "m/s";
		document.getElementById("windrichting").innerHTML = degToCard(data.wind.deg);
		document.getElementById("zonsopgang").innerHTML = stringToTime(data.sys.sunrise);
		document.getElementById("zonsondergang").innerHTML = stringToTime(data.sys.sunset);
		document.getElementById("location").innerHTML = (data.name);


		

		
		var requestDate = new Date();

		var array = {};
		array.jsondata = data;
		array.datum = requestDate;
		

		window.sessionStorage.setItem(city, JSON.stringify(array));

	},"json");
		
		
	}
}











function loadCountries(){
	

	//receive information from own Country-API
	$.getJSON("restservices/countries/","jsonp" ,function(data){

        console.log("Alle rows verwijdert");
        $('#countrylist td').remove();
        console.log("Eerste row toevoegen");
        $('#countryList').append("<tr><`th>"+ "Select" + "</th><th>"+'Land'+"</th><th>"+'Hoofdstad'+"</th><th>"+'Regio'+"</th><th>"+'Surface'+"</th><th>"+'Populatie'+"</th><th>"+'Delete'+"</th><th>"+'Wijzig' +"</th></tr>");
        $.each(data, function (k, v) {
            var latitude = v.latitude;

            var longitude = v.longitude;

            var stad = v.capital;
		 var gov = v.government;
            $('#countrylist').append("<tr> <td><input type='button' value='select' onclick= 'weather(\"" + latitude + "\", \"" + longitude + "\", \"" + stad + "\");'></td><td class='landnaam'>" + v.Land + "</td><td>" + v.capital + "</td><td>" + v.region + "</td><td>" + v.surface + "</td><td>" + v.population + "</td><td><input class='deleteButton' type='button' value=\"Delete\" onclick='deleteLand(\"" + v.code + "\");'></td><td><input type='button'  value=\"Wijzig\" onclick='wijzigLand(\"" + v.code + "\",\"" +  v.Land + "\",\"" + v.capital + "\", \"" + v.region + "\", \"" + v.surface + "\" ,\"" + v.population +"\",\"" + gov+"\", \""+v.longitude+"\",\""+v.latitude+"\" ,\"" +v.continent+"\" ,\""+v.code2+"\");' </td></tr>");




            return (v.Land !== "Pakistan");



        });
		
	},"json");
}
var modal = document.getElementById('myModal');
var modalcontent = document.getElementById('modal-content');
/*
	document.getElementById('kortnaam').value = code;
*/
function messageWindow(message, color){

    var messageboxText = document.getElementById('messagebox-text');

    messageboxText.innerHTML = message;

    messagebox.style.backgroundColor = color;
    messagebox.style.resize = 500;
    $('#messagebox').fadeIn(1000, function(){
        $('#messagebox').fadeOut(5000);
    });
}

function wijzigLand(code,land,capital,region,surface,population,regering,lon,lat,cont,iso3){

	document.getElementById('input-landcode').value = code;
    document.getElementById('input-naam').value = land;
    document.getElementById('input-hoofdstad').value = capital;
    document.getElementById('input-regio').value = region;
    document.getElementById('input-oppervlakte').value = surface;
    document.getElementById('input-inwoners').value = population;
    document.getElementById('input-lon').value = lon;
    document.getElementById('input-lat').value = lat;

    document.getElementById('input-regering').value = regering;
    document.getElementById('input-continent').value = cont;
    document.getElementById('intput-hidden').value = iso3;


    messageWindow("Land gepakt", 'green');
    modal.style.display = "block";

}
function countryWijzig(){

        console.log("check-1");
        var kort = $('#input-landcode').val();

    var lang = $('#intput-hidden').val();


        var naam = $('#input-naam').val();
        var capital = $('#input-hoofdstad').val();
        var regio = $('#input-regio').val();
        var oppervlakte = $('#input-oppervlakte').val();
        var populatie = $('#input-inwoners').val();
		var continent =  $('#input-continent').val();
		var latitude = $('#input-lat').val();
		var longitude = $('#input-lon').val();
		var regering = $('#input-regering').val();

                oppervlakte = Number(oppervlakte);
                oppervlakte.toFixed(2);

                populatie = Number(populatie);
                populatie.toFixed(0);

    lat = Number(latitude);
    lat.toFixed(2);

    lon = Number(longitude);
    lon.toFixed(2);
    var data = { "kort": kort, "lang": lang, "land": naam, "capital": capital, "continent": continent, "regio": regio,	"oppervlakte": oppervlakte, "populatie": populatie, "regering": regering, "latitude": lat, "longitude": lon};


            var JSONdata = JSON.stringify(data);


            $.ajax("/restservices/countries/"+lang,{
                type: "put",
                data: JSONdata,
                beforeSend: function (xhr) {
                    var token = window.sessionStorage.getItem("sessionToken");
                    xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
                },

                success: function(response){
                	loadCountries();
                    modal.style.display = "none";
                    messageWindow("Response:" + response.response, "green");


                },
                error: function(response){
                    messageWindow("Je bent niet ingelogd, log eerst in!", "red");
                }
            });



}
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
    modalcontent.style.display=  "grid";
}

$("#close, #cancel, #create").click(function() {
    $("#popup").hide();
});

function stringToTime(seconds){	

	return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}





function tenMinutesAgo(date){
	var oldDate = parseDate(date);

	
	
	var Ten_Minutes = 60*10*1000; // 10 minuten in ms
	// tijd van nu als string omdat de datums anders niet gelijk zijn aan elkaar
	var currentDate = JSON.stringify(new Date()); 
	// en ook weer parsen
	var dateNow = parseDate(currentDate);
	
	


	
	var difference = dateNow - oldDate; // verschil in tijd in milliseconds


	
	// is de date minimaal 10 minuten geleden t.o.v. de currentDate?
	
	if(difference >= Ten_Minutes){ // dan is het NIET minimaal 10 minuten geleden
		return true;
	}
	else{ // minimaal 10 minuten geleden of geen datum(miliseconde = 0)
		return false;
	}	

}


//parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5], parts[6]); // months are 0-based
}




function degToCard(deg){
	  if (deg>11.25 && deg<33.75){
	    return "Noord / Noord-Oost";
	  }else if (deg>33.75 && deg<56.25){
	    return "Noord-Oost";
	  }else if (deg>56.25 && deg<78.75){
	    return "Oost / Noord-Oost";
	  }else if (deg>78.75 && deg<101.25){
	    return "Oost";
	  }else if (deg>101.25 && deg<123.75){
	    return "Oost Zuid-Oost";
	  }else if (deg>123.75 && deg<146.25){
	    return "Zuid-Oost";
	  }else if (deg>146.25 && deg<168.75){
	    return "Zuid Zuid-Oost";
	  }else if (deg>168.75 && deg<191.25){
	    return "Zuid";
	  }else if (deg>191.25 && deg<213.75){
	    return "Zuid Zuid-West";
	  }else if (deg>213.75 && deg<236.25){
	    return "Zuid-West";
	  }else if (deg>236.25 && deg<258.75){
	    return "West Zuid-West";
	  }else if (deg>258.75 && deg<281.25){
	    return "West";
	  }else if (deg>281.25 && deg<303.75){
	    return "West Noord-West";
	  }else if (deg>303.75 && deg<326.25){
	    return "Noord-West";
	  }else if (deg>326.25 && deg<348.75){
	    return "Nootd Noord-West";
	  }else{
	    return "Noord"; 
	  }
	}

