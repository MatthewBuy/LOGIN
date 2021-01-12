

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
      var forms = document.getElementsByClassName('needs-validation');
      // Faz um loop neles e evita o envio
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

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