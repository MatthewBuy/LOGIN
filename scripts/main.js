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

    Login(login);
  }

function Login(Login){
   $.ajax({

      type : 'POST',

        beforeSend: function(request) {
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Accept", "application/json");
          request.setRequestHeader("Access-Control-Allow-Origin", "*");
          $("#loader").show();
          },

            url : 'https://slinky-api.herokuapp.com/login',
            data: JSON.stringify(Login),
            dataType: "json",

        complete:function(){
          $("#loader").hide();
        },
    
        success: function(resposta){
          localStorage.setItem("token", resposta.token);
          location.href="tabela.html";
          console.log(resposta);
        M.toast({
          html: 'Login realizado com sucesso',
          classes:'green'
          }); 
        },

      error: function(){
    
    }    

  });

}






