var old;

function Delayed() {

    var text = document.getElementById("input");


    if(old !== text.value){
        old = text.value;
        console.log(old);
    }
}

var interval = setInterval(Delayed, 5000);

