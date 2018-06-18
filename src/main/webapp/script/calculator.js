
var huidig = 0;
var tussenGetal = 0;
var resultaat;
var tekens;

function updateDisplay(getal) {
    huidig = huidig + getal;
    document.getElementById("display").innerHTML = huidig;
}

function deleteDisplay() {
    huidig = "";
    tussenGetal = 0;
    tekens = undefined;
    document.getElementById("display").innerHTML = huidig;
}

function bereken(teken) {
    if (tekens === undefined){
        tussenGetal += parseInt(huidig);
        huidig = "";
        tekens = teken;
    } else {
        switch (tekens) {
            case "+":
                tussenGetal += parseInt(huidig);
                break;
            case "-":
                tussenGetal -= parseInt(huidig);
                break;
            case "*":
                tussenGetal *= parseInt(huidig);
                break;
            case "/":
                tussenGetal /= parseInt(huidig);
                break;
            default:
                break;
        }
        tekens = teken;
        huidig = "";
        document.getElementById("display").innerHTML = tussenGetal;
    }
}

function berekenResultaat() {
    if (tekens === undefined) {
        document.getElementById("display").innerHTML = huidig;
    } else {
        switch (tekens) {
            case "+":
                resultaat = tussenGetal + parseInt(huidig);
                document.getElementById("display").innerHTML = resultaat;
                break;
            case "-":
                resultaat = tussenGetal - parseInt(huidig);
                document.getElementById("display").innerHTML = resultaat;
                break;
            case "*":
                resultaat = tussenGetal * parseInt(huidig);
                document.getElementById("display").innerHTML = resultaat;
                break;
            case "/":
                resultaat = tussenGetal / parseInt(huidig);
                document.getElementById("display").innerHTML = resultaat;
                break;
            default:
                break;
        }
    }
}
