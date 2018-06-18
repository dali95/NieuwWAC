$(document).ready(function(){

    $('#home').hide();
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#messagebox').hide();




});




$("#menu-home").click(function(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();

    $('#home').fadeIn(1000);
});
$("#menu-toevoegen").click(function(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();

    $('#toevoegen').fadeIn(1000);
});


$('#menu-item1').click(function(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();


    $('#toevoegen').fadeIn(1000);
});
$('#menu-wijzig').click(function(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();


    $('#land-pagina').fadeIn(1000);
});

$('#menu-item2').click(function(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();


    $('#search').fadeIn(1000);
});

$('#menu-login').click(function(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();

    $('#login').fadeIn(1000);
})


function showCountryPage(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();


    $('#land-pagina').fadeIn(1000);
}

function closeCountryPage(){
    $('#toevoegen').hide();
    $('#search').hide();
    $('#land-pagina').hide();
    $('#home').hide();
    $('#login').hide();


    $('#search').fadeIn(1000);
}

function otherServices(){
    var url = "index.html";
    window.location.href = url;
}
function countryPagina(){
    var url= "Weather.html";
    window.location.href = url;
}





function messageWindow(message, color){

    var messageboxText = document.getElementById('messagebox-text');

    messageboxText.innerHTML = message;

    messagebox.style.backgroundColor = color;
    messagebox.style.resize = 500;
    $('#messagebox').fadeIn(1000, function(){
        $('#messagebox').fadeOut(5000);
    });
}


function clearTable(){
    $('#tableBody').empty();

}




function landOphalen(code){

    try{

        $.getJSON("/restservices/countries/"+code,+"jsonp" ,function(data){

            console.log(data);

            document.getElementById("input-landcode-kort").value = data.code;
            document.getElementById("input-landcode-lang").value = data.code2;
            document.getElementById("input-land_naam").value = data.Land;
            document.getElementById("input-hoofdstad").value = data.capital;
            document.getElementById("input-continent").value = data.continent;
            document.getElementById("input-regio").value = data.region;
            document.getElementById("input-oppervlakte").value = data.surface;
            document.getElementById("input-populatie").value = data.population;
            document.getElementById("input-regering").value = data.government;
            document.getElementById("input-latitude").value = data.latitude;
            document.getElementById("input-longtitude").value = data.longitude;
            document.getElementById("land-invoer-header").append(data.name);
            document.getElementById("hidden-code").value = data.code2;



            showCountryPage();

            messageWindow("De data is succesvol opgehaald uit de database!", "green");


        }),"json" }

    catch(err){


        messageWindow("er is een fout opgetreden:" +err, "red");

    }
}






function alleLanden(){

    clearTable();
    try{

        $.getJSON("/restservices/countries","jsonp" ,function(data){
            $.each(data, function(k, v){
                $('tbody').append("<tr onclick= 'landOphalen(\"" + v.code2 + "\");'><td><div>"+v.Land+"</div></td><td><div>"+v.code+"</div></td><td><div>"+v.capital+"</div></td><td><div>"+v.continent+"</div></td><td><div>"+v.region+"</div></td><td><div>"+v.surface+"</div></td><td><div>"+v.population+"</div></td><td><div>"+v.government+"</div></td><td><div>"+v.latitude+"</div></td><td><div>"+v.longitude+"</div></td></tr>");
            });


            $('#keuze-invoer-header').empty();
            document.getElementById("keuze-invoer-header").append("Overzicht van landen: Alle Landen");


            messageWindow("De data is succesvol opgehaald uit de database!", "green");

        }),"json"}


    catch(err){
        messageWindow("er is een fout opgetreden:" +err, "red");

    }
}


















function grootsteOppervlaktes(){

    clearTable();

    try{


        $.getJSON("/restservices/countries/largestsurfaces","jsonp" ,function(data){
            $.each(data, function(k, v){
                $('tbody').append("<tr onclick= 'landOphalen(\"" + v.code2 + "\");'><td><div>"+v.Land+"</div></td><td><div>"+v.code+"</div></td><td><div>"+v.capital+"</div></td><td><div>"+v.continent+"</div></td><td><div>"+v.region+"</div></td><td><div>"+v.surface+"</div></td><td><div>"+v.population+"</div></td><td><div>"+v.government+"</div></td><td><div>"+v.latitude+"</div></td><td><div>"+v.longitude+"</div></td></tr>");
            });

            $('#keuze-invoer-header').empty();
            document.getElementById("keuze-invoer-header").append("Overzicht van landen: Oppervlakte");

            messageWindow("De data is succesvol opgehaald uit de database!", "green");

        }),"json"}

    catch(err){

        messageWindow("er is een fout opgetreden:" +err, "red");

    }

}









function grootstePopulaties(){

    clearTable();

    try{

        $.getJSON("/restservices/countries/largestpopulations","jsonp" ,function(data){
            $.each(data, function(k, v){
                $('tbody').append("<tr onclick= 'landOphalen(\"" + v.code2 + "\");'><td><div>"+v.Land+"</div></td><td><div>"+v.code+"</div></td><td><div>"+v.capital+"</div></td><td><div>"+v.continent+"</div></td><td><div>"+v.region+"</div></td><td><div>"+v.surface+"</div></td><td><div>"+v.population+"</div></td><td><div>"+v.government+"</div></td><td><div>"+v.latitude+"</div></td><td><div>"+v.longitude+"</div></td></tr>");
            });

            $('#keuze-invoer-header').empty();
            document.getElementById("keuze-invoer-header").append("Overzicht van landen: Populatie");

            messageWindow("De data is succesvol opgehaald uit de database!", "green");

        }),"json"}


    catch(err){

        messageWindow("er is een fout opgetreden:" +err, "red");

    }
}





function randomSearch(){

    clearTable();

    try{

        var zoek = $('#search-input').val();
        console.log("zoek: "+ zoek);




        $.getJSON("/restservices/countries/" + zoek ,+"jsonp" ,function(data){

            if(data.length == 0){

                messageWindow("Er is GEEN data gevonden: zoek opnieuw!", "yellow");

            }
            else{

                $.each(data, function(k, v){
                    console.log(data);

                    $('tbody').append("<tr onclick= 'landOphalen(\"" + v.code2 + "\");'><td><div>"+v.Land+"</div></td><td><div>"+v.code+"</div></td><td><div>"+v.capital+"</div></td><td><div>"+v.continent+"</div></td><td><div>"+v.region+"</div></td><td><div>"+v.surface+"</div></td><td><div>"+v.population+"</div></td><td><div>"+v.government+"</div></td><td><div>"+v.latitude+"</div></td><td><div>"+v.longitude+"</div></td></tr>");

                });

                $('#keuze-invoer-header').empty();
                document.getElementById("keuze-invoer-header").append("Overzicht van landen: Random Search");

                messageWindow("De data is succesvol opgehaald uit de database!", "green");

            }

        }),"json"}


    catch(err){


        messageWindow("er is een fout opgetreden:" +err, "red");


    }
}


function isNumber(num) {
    return (typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '';
}





function createCountry(){

    try{
        console.log("check-1");
        var kort = $('#landcode-kort').val();
        var lang = $('#landcode-lang').val();
        var naam = $('#land_naam').val();
        var city = $('#hoofdstad').val();
        var continent = $('#continent').val();
        var regio = $('#regio').val();
        var oppervlakte = $('#oppervlakte').val();
        var populatie = $('#populatie').val();
        var regering = $('#regering').val();
        var lat = $('#latitude').val();
        var lon  = $('#longtitude').val();


        var continentList = [ 'Europe' , 'Asia' , 'South America' , 'Antarctica' , 'North America' , 'Oceania' , 'Africa'  ];

        console.log("1");

        if((kort.length > 0) == false || (kort.length <=2) == false ){
            messageWindow("landcode (kort) is MAX 2 tekens", "red");
        }
        else if((lang.length <= 3) == false){
            messageWindow("landcode (lang) is MAX 3 tekens", "red");
        }
        else if((naam.length > 0) == false || (naam.length <= 52) == false){
            messageWindow("landnaam  Moet ingevuld zijn  en en uit maximaal 52 tekens bestaan", "red");
        }
        else if((city.length > 0) == false){
            messageWindow("Je moet een hoofdstad invullen", "red");
        }
        else if((continentList.indexOf(continent) > -1) == false){
            messageWindow("Geldige continenten zijn : Europe , Asia , South America , North America , Oceania , Africa , Antarctica ", "red");
        }
        else if((regio.length <= 26) == false){
            messageWindow("Regio is MAX 26 tekens", "red");
        }
        else if(isNumber(oppervlakte) == false){
            messageWindow("Oppervlakte MOET een getal zijn", "red");
        }
        else if(isNumber(populatie) == false){
            messageWindow("Populatie MOET een getal zijn", "red");
        }
        else if((regering.length <= 45) == false){
            messageWindow("Regering is MAX 45 tekens","red");
        }
        else if(isNumber(lat) == false){
            messageWindow("Latitude MOET een getal zijn", "red");
        }
        else if(isNumber(lon) == false){
            messageWindow("Longitude MOET een getal zijn", "red");
        }
        else{
            console.log("2");
            try{

                oppervlakte = Number(oppervlakte);
                oppervlakte.toFixed(2);

                populatie = Number(populatie);
                populatie.toFixed(0);

                lat = Number(lat);
                lat.toFixed(2);

                lon = Number(lon);
                lon.toFixed(2);

                console.log("3");

            }catch(err){
                messageWindow("Error met converteren:" + err, "red");
            }



            var data = { "kort": kort, "lang": lang, "land": naam, "capital": city, "continent": continent, "regio": regio,	"oppervlakte": oppervlakte, "populatie": populatie, "regering": regering, "latitude": lat, "longitude": lon};
            var JSONdata = JSON.stringify(data);
            $.ajax("/restservices/countries/"+kort,{
                type: "post",
                data: JSONdata,
                beforeSend: function (xhr) {
                    var token = window.sessionStorage.getItem("sessionToken");
                    xhr.setRequestHeader( 'Authorization', 'Bearer ' + token);
                },

                success: function(response){
                    messageWindow("Response:" + response.response, response.kleur);
                },
                error: function(response){
                    messageWindow("Je bent niet ingelogd, log eerst in ", "red");


                }
            });
        }
    }
    catch(err){
        messageWindow("Error:" + err, "red");
    }
}

function userLogin(){
    var data = $('#login-form').serialize();
    $.post("/restservices/authentication", data, function(response){
        window.sessionStorage.setItem("sessionToken", response);

        $('#login').hide();
        $('#toevoegen').fadeIn(1000);



    }).fail(function(jqXHR, textStatus, errorThrown) {
        messageWindow("Inloggen is mislukt, probeer een andere gebruikernaam en wachtwoord!", "red");
        console.log(textStatus);
        console.log(errorThrown);
    });
}




