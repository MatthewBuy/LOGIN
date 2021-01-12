
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


function fazerRegistro () {
    var nome = document.querySelector("#nome");
    var email = document.querySelector("#email");
    var acesso = document.getElementById("primeiro_acesso");
    var repSenha = document.querySelector("#repetirSenha");
    var senha = document.querySelector("#senha");

    
   var token = window.localStorage.getItem("token");
    console.log(token);

    var registro = {
        nome : nome.value,
        email : email.value,
        redefinir_senha_primeiro_acesso : acesso.checked,
        senha : senha.value,
        repSenha : repSenha.value,
        tipo : "SLINKY",
        ativo: true
      
    };

    console.log(registro);

    if(senha.value == repSenha.value){
        $.ajax({
            type : 'POST',
            beforeSend: function(request) {
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("Access-Control-Allow-Origin", "*");
                request.setRequestHeader("Authorization", "Bearer " + token);
              },
              
            url : 'https://slinky-api.herokuapp.com/usuarios',
            data: JSON.stringify(registro),
            dataType: "json",
            success: function(resposta){
                console.log(resposta);
            },
            error: function(response){
                console.log(response);
            }
    
        });
    }else{
        alert("As senhas não batem.")
    }

  

    

}