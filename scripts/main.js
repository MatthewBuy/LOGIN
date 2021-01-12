
function fazerLogin () {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var login = {
        email : email,
        senha : senha
    };

    
    $.ajax({
        type : 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Access-Control-Allow-Origin", "*");
          },
        url : 'https://slinky-api.herokuapp.com/login',
        data: JSON.stringify(login),
        dataType: "json",
        success: function(resposta){
            localStorage.setItem("token", resposta.token);
            console.log(resposta);
        }    
    });

 

}



/* var d = new Date();

 document.getElementById("data").innerHTML = d.toDateString();
function validarSenha(){

    document.getElementById("demo").innerHTML =
Math.floor(Math.random() * 101);   // returns a random integer from 0 to 100

var da = new Date();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
document.getElementById("data").innerHTML = months[da.getMonth()];
}*/