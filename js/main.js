ind = 0;
id = null;
showSlides = true;



function init() {
    select(0);
}

function setSlide(n) {
    clearTimeout(id);
    ind = n;
    showDivs();
}

function nextSlide() {
    clearTimeout(id);
    ind += 1;
    showDivs();
}

function prevSlide() {
    clearTimeout(id);
    ind -= 1;
    showDivs();
}

function home() {
    ind = 0;
    showDivs();
}

function contact() {
}

function select(choice) {
    var items =  document.getElementsByClassName("menu-item");
    if(choice >= 0 && choice<items.length){
        clearTimeout(id);
        for(index =0; index< items.length; index++){
            if(index !== choice){
                items[index].style.display = "none";
            }
            else{
                items[index].style.display = "block";
            }
        }

        switch (choice){
            case 0:
                home();
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                contact();
                break;
        }
    }
}

function initMap() {
    var uluru = {lat: 44.429029, lng: 26.054090};

    var mapOptions = {
        center: new google.maps.LatLng(44.429029, 26.054090),
        zoom: 15
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}

function showDivs() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dots");
    if (ind >= x.length) {ind = 0}
    if (ind < 0) {ind = x.length-1}

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }

    x[ind].style.display = "block";
    dots[ind].className += " w3-white";

    id = setTimeout(nextSlide, 20000);
}

