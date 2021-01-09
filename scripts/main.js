
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let form = document.querySelector("#form");

form.addEventListener("submit", function(event){
    event.preventDefault();

    let dados = {
        email: email.value,
        senha: senha.value
    };

    fetch('https://slinky-api.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify(dados)
    })
    .then(function(response){
        console.log(response);
       // return response.json()
    })
   // .then(function(response){
        //console.log(response);
        //alert("ok cadastro com sucesso")
    //})

    console.log(dados);
})




/*function ajax(){
var xmlhttp;

if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest;
}else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readState == 4 && xmlhttp.status == 200){
        document.getElementById("data").innerHTML = this.responseText;
    }
}

xmlhttp.open('GET', 'arquivo.txt', true);
xmlhttp.send();
}*/



/*function fazerLogin () {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var login = {
        email : email,
        senha : senha
    };

    
    $.ajax({
        type : 'POST',
        url : 'https://slinky-api.herokuapp.com/login',
        data : login,
        dataType: "json",
        success: function(resposta){
            console.log(resposta);
        }

    });

}*/



/* var d = new Date();

 document.getElementById("data").innerHTML = d.toDateString();
function validarSenha(){

    document.getElementById("demo").innerHTML =
Math.floor(Math.random() * 101);   // returns a random integer from 0 to 100

var da = new Date();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
document.getElementById("data").innerHTML = months[da.getMonth()];
}*/