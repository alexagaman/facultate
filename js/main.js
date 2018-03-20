ind = 0;
id = null;
showSlides = true;

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
    showSlides = true;
    clearTimeout(id);
    showDivs();
}

function showDivs() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
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

