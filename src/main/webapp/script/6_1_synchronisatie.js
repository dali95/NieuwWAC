function storage(){
    var text = document.getElementById("text").value;
	window.localStorage.setItem("text", text);
	console.log(window.localStorage);
}

window.addEventListener('storage', function(event) {  
    console.log("changed key: " + event.key);
    console.log("new value  : " + event.newValue);
    console.log("old value  : " + event.oldValue);
    console.log("storage    : " + event.storageArea);
    console.log("url        : " + event.url);
    document.getElementById('p2_text').innerHTML = event.newValue;
});
