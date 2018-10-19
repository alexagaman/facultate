slideind = 0;
id = null;
username = null;
months = [{days : 31, month: "Ianuarie"},
          {days : 28, month: "Februarie"},
          {days : 31, month: "Martie"},
          {days : 30, month: "Aprilie"},
          {days : 31, month: "Mai"},
          {days : 30, month: "Iunie"},
          {days : 31, month: "Iulie"},
          {days : 31, month: "August"},
          {days : 30, month: "Septembrie"},
          {days : 31, month: "Octombrie"},
          {days : 30, month: "Noiembrie"},
          {days : 31, month: "Decembrie"}];
d = new Date();
showC = 0;
monthNr = d.getMonth();
linksv = ['Home', 'Despre noi', ['Galerie/Nunti', 'Galerie/Aniversari', 'Galerie/Botezuri', 'Galerie/Petreceri'],
            ['Servicii/Cabina Foto', 'Servicii/Photo Corner'], 'Pachete', 'Contact'];
$(document).ready(function (e) {
    $("#uploadimage").submit(function(e) {
        e.preventDefault();
        urls = "upload_file.php";
        switch($('#type').val()){
            case 'nunti':
                break;
            case 'petreceri' :
                urls = "upl_file4.php";
                break;
            case 'aniversari' :
                urls = "upl_file2.php";
                break;
            case 'botezuri':
                urls = "ipl_file3.php";
                break;
        }
        $.ajax({
            url: urls, // Url to which the request is send
            type: "POST",             // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
            {
                if(data === "ok"){
                    window.reload();
                }
                else{
                    alert(data);
                }
            }
            });
    })});

chatRefresh = null;
chatNr = 0;
mouseTiming = {};

function init() {
    if($.cookie("logged")){
        $("#login-box").hide();
        $("#logout-box").show();
        username = $.cookie("logged");
        $("#user").text(username);
        $('#chat').show();
    }
    select(0);
}

function setSlide(n) {
    clearTimeout(id);
    slideind = n;
    showDivs();
}

function nextSlide() {
    clearTimeout(id);
    slideind += 1;
    showDivs();
}

function prevSlide() {
    clearTimeout(id);
    slideind -= 1;
    showDivs();
}

function home() {
    slideind = 0;
    showDivs();
    canvasGraph();
    if(username != null)
        showHistory();
    else{
        $('#history').hide();
    }
    showMouseTop();
}

function showMouseTop() {
    list = [];
    for(key in mouseTiming){
        list.push([key, mouseTiming[key]]);
    }

    list.sort(function(a, b){return a[1].time - b[1].time});

    toptext = '<ol>';
    j = 0;
    for(j=0; j<3 && j <list.length; j++){
        toptext+='<li>' + list[j][0] + '</li>';
        if(j===3)
            break;
    }
    toptext += '</ol>';
    $('#mousetop').html(toptext);
}

function showHistory() {
    $.get('get_history.php',
        {"username": username},
        function(data,status,xhr){
            text = "<br> <header><b>Linkuri accesate</b>  </header><ol>";
            links = JSON.parse(data);
            for(ind in links){
                text += '<li>' + links[ind] + '</li>';
            }
            text += '</ol>';
            $('#history').html(text);
            $('#history').show();


        }
    );
}

function select(choice, subchoice = -1) {
    var items =  document.getElementsByClassName("menu-item");
    var item;

    if(choice >= 0 && choice<items.length){
        clearTimeout(id);
        for(index =0; index< items.length; index++){
            if(index !== choice){
                items[index].style.display = "none";
            }
            else{
                items[index].style.display = "block";
                item = items[index];
                if(username != null){
                    if(subchoice >= 0 && item !== undefined){
                        $.get('link_press.php',
                            {"username": username, "link" : linksv[choice][subchoice]});
                    }
                    else{
                        $.get('link_press.php',
                            {"username": username, "link" : linksv[choice]}
                        );
                    }
                }
            }
        }

        if(choice === 0){
            home();
        }
        if(subchoice >= 0 && item !== undefined){
            let subitems = item.getElementsByClassName("menu-subitem");
            let subitem = null;
            for(index =0; index< subitems.length; index++){
                if(index !== subchoice){
                    subitems[index].style.display = "none";
                }
                else{
                    subitems[index].style.display = "block";
                    subitem = subitems[index];
                }
            }
            if(choice === 2){
                showGallery(subchoice, subitem);
            }
        }
    }
}

function showGallery(choice, item) {
    let type = null;
    switch(choice){
        case 0:
            type = 'nunti';
            break;
        case 1:
            type = 'aniversari';
            break;
        case 2:
            type = 'botezuri';
            break;
        case 3:
            type = 'petreceri';
            break;
    }
    $.get('get_images.php',
        {"type": type},
        function(data,status,xhr){
            let imgs = JSON.parse(data);
            text = '';
            for(ind in imgs){
                text += "<div style='height: 400px;' class='center'><img  class='gallery-image' alt='pic' src='" + imgs[ind];
                text += "' alt='poza " + type + "' width='33%'></div>";
            }
            item.innerHTML = text;
        });

}

function timeMouse(element) {
    if (mouseTiming[element]){
        mouseTiming[element].startTime = new Date().getTime();
    }
    else{
        st = new Date().getTime();
        mouseTiming[element]={'startTime': st, 'time': 0};
    }
}

function stopTimeMouse(element){
    if (mouseTiming[element]){
        st = new Date().getTime();
        mouseTiming[element].time += (st - mouseTiming[element].startTime);
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
    let i;
    let xslide = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dots");
    if (slideind >= xslide.length) {slideind = 0}
    if (slideind < 0) {slideind = xslide.length-1}

    for (i = 0; i < xslide.length; i++) {
        xslide[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }

    xslide[slideind].style.display = "block";
    dots[slideind].className += " w3-white";

    id = setTimeout(nextSlide, 20000);
}

function logout(){
    $.ajax({
        type: 'POST',
        url : 'logout.php',
        data: {'username' : username},
        success: function (response) {
            if(response==='ok') {
                $.removeCookie("logged");
                $("#login-box").show();
                $("#logout-box").hide();
                $('#chat').hide();
                select(0);
            }
        }
    })
}

function signup() {
    usern = $('#username2').val();
    if(usern.length < 4){
        alert("Username prea scurt");
        return;
    }
    pass = $('#parola2').val();
    if(pass.length < 4){
        alert("Parola prea scurta");
        return;
    }
    passc = $('#parolac').val();
    email = $('#email').val();
    if(!validateEmail(email)){
        alert("Email invalid!");
        return;
    }
    let data = {'username' : usern,
        'password' : pass,
        'email': email};
    if(pass === passc){
        $.ajax({
            type: 'POST',
            url : 'signup.php',
            data: data,
            success: function (response) {
                if(response === 'ok') {
                    $("#signup-form")[0].reset();
                    $.cookie("logged", usern);
                    $("#login-box").hide();
                    $("#logout-box").show();
                    $("#user").text(usern);
                    select(0);
                    $('#chat').show();

                }
                else{
                    alert(response);
                }
            }
        })
    }
    else{
        alert("Parolele introduse nu sunt la fel");
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function submitForm() {
    var data = $("#login-form").serialize();
    $.ajax({
        type : 'POST',
        url : 'login.php',
        data : data,
        beforeSend: function(){
            $("#error").fadeOut();
            $("#login_button").html('sending...');
        },
        success : function(response){
            $("#login_button").html('Send');
            if(response=="ok"){
                select(0);
                username = $("#username").val();
                $.cookie("logged", username);
                $("#login-box").hide();
                $("#logout-box").show();
                $("#login-form")[0].reset();
                $("#user").text(username);
                $('#chat').show();
            } else {
               alert("Parola sau username gresit!")
                $("#username").text("");
                $("#password").text("");
            }
        }
    });
    return false;
}

function canvasGraph(){
    Val_max = 20;
    var stepSize = 2;
    var columnSize = 50;
    var rowSize = 25;
    var margin = 5;


    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.fillStyle = "#005599";
    context.font = "45 pt Verdana ";

    yScale = (canvas.height - columnSize - margin) / Val_max ;
    xScale = (canvas.width - rowSize) / months[monthNr].days;

    context.strokeStyle="#888888"; // color of grid lines
    context.beginPath();
    // print Parameters on X axis, and grid lines on the graph
    countd = [];
    for (i=1;i<=months[monthNr].days;i++) {
        x = i * xScale;
        context.fillText(i.toString(), x,columnSize - margin);
        context.moveTo(x, columnSize);
        context.lineTo(x, canvas.height - margin);
        countd.push(0);
    }
    // print row header and draw horizontal grid lines
    count =  0;
    for (scale=Val_max;scale>=0;scale = scale - stepSize) {
        y = columnSize + (yScale * count * stepSize);
        context.fillText(scale, margin,y + margin);
        context.moveTo(rowSize,y);
        context.lineTo(canvas.width,y);
        count++;
    }
    context.stroke();

    context.translate(rowSize,canvas.height);
    context.scale(1,-1 * yScale);

    context.strokeStyle="#000";
    firstDay = new Date(d.getFullYear(), d.getMonth(), 0);
    lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);

    $.get('numar_utilizatori.php',{"firstDay": firstDay, "lastDay" : lastDay},function(data,status,xhr){
        jsa = JSON.parse(data);
        for(ind in jsa){
            x = new Date(jsa[ind]);
            countd[x.getDay()+1] += 1;
        }
        plotData(countd);
    });

}

function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet[0]);
    for (i=1;i<months[monthNr].days;i++) {
        context.lineTo(i * xScale, dataSet[i]);
    }
    context.stroke();
}

function showChat() {
    if(username) {
        showC = (showC + 1) % 2;
        if (showC === 1) {
            $('#chat-content').show();
            chatRefresh = setInterval(updateChat , 2000);
        }
        else {
            $('#chat-content').hide();
            clearInterval(chatRefresh);
        }
    }
}

function updateChat() {
    $.get('get_chat_messages.php',
        function(data,status,xhr){
            messages = JSON.parse(data);
            if(messages.length > chatNr){
                nr = chatNr - messages.length;
                chatNr = messages.length;
                messages = messages.slice(nr);
                text = '';
                for(i in messages){
                    if(messages[i].username === username){
                        text += "<div class='chat-container'><p>" + messages[i].message;
                        text += "</p><span class='chat-time-right'>" + messages[i].username + "</span></div>";
                    }
                    else{
                        text += "<div class='chat-container chat-darker'><p>" + messages[i].message;
                        text += "</p><span class='chat-time-left'>" + messages[i].username + "</span></div>";
                    }
                }
                $('#messages').append(text);
            }
        });
}

function sendMessage(){
    data = {'message' : $('#chat-message').val(), 'username' : username};
    $.ajax({
        type: 'POST',
        url: 'send_message.php',
        data: data,
        success: function (response) {
           if(response === 'ok'){
               updateChat();
               $('#chat-message').val('');
           }
        }
    });
}
