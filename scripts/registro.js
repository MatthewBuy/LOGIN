var token = window.localStorage.getItem("token");

var queries = {};
  $.each(document.location.search.substr(1).split('&'),function(c,q){
    var i = q.split('=');
    if(q != ""){
      queries[i[0].toString()] = i[1].toString();
      console.log(queries.idUsuario); 
      BuscarUsuario(queries);
    }
  });

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

function fazerRegistro() {
  var nome     = document.querySelector("#nome");
  var email    = document.querySelector("#email");
  var acesso   = document.querySelector("#primeiro_acesso");
  var ativo    = document.querySelector("#Ativo");
  var repSenha = document.querySelector("#repetirSenha");
  var senha    = document.querySelector("#senha"); 
  var tipo     = $('#tipo').val();
 
  var registro = {
    nome : nome.value,
    email : email.value,
    redefinir_senha_primeiro_acesso : acesso.checked,
    senha : senha.value,
    repSenha : repSenha.value,
    tipo : tipo,
    ativo: ativo.checked  
    };

  if (senha.value == repSenha.value) {
      FazerRegistro(registro);
  } else {
      alert("As senhas não batem.")
  }
}

function editarUsuario() {
  var nome     = document.querySelector("#nome");
  var email    = document.querySelector("#email");
  var acesso   = document.querySelector("#primeiro_acesso");
  var ativo    = document.querySelector("#Ativo");
  var repSenha = document.querySelector("#repetirSenha");
  var senha    = document.querySelector("#senha"); 
  var tipo     = $('#tipo').val();

  var atualizarRegistro = {
    nome : nome.value,
    email : email.value,
    redefinir_senha_primeiro_acesso : acesso.checked,
    senha : senha.value,
    repSenha : repSenha.value,
    tipo : tipo,
    ativo: ativo.checked  
  };

  if (senha.value == repSenha.value){
      EditarUsuario(atualizarRegistro);
  } else {
      alert("As senhas não batem.")
  }


}

function Voltar() {
    window.location.href="tabela.html";
}

function FazerRegistro(registro) {
  $.ajax({
    type : 'POST',
      beforeSend: function(request) {
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        request.setRequestHeader("Authorization", "Bearer " + token);  
        $("#loader").show();
      },
    url : 'https://slinky-api.herokuapp.com/usuarios',
    data: JSON.stringify(registro),
    dataType: "json",
    complete:function() {
      $("#loader").hide();
    },
    success: function(resposta) {
      console.log(resposta);

    },
    error: function(response) {
      console.log(response);
    }
  });
}

function BuscarUsuario(queries) {
  $.ajax({
    type : 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        $("#loader").show();
        request.setRequestHeader("Authorization", "Bearer " + token);
      },
    url : 'https://slinky-api.herokuapp.com/usuarios/'+queries.idUsuario,
    dataType: "json",
    complete:function(){
      $("#loader").hide();
    },
    success: function(resposta){
      var idNome = resposta.nome;
      var idEmail = resposta.email;
      document.querySelector("#nome").value = idNome;
      email = document.querySelector("#email").value = idEmail;
      document.getElementById("textoInfo").innerHTML = "Editar conta";
      document.getElementById("submitButton").innerHTML = "Atualizar";
    },
    error: function(response){
      console.log(response);
    }
  });
}

function EditarUsuario(atualizarRegistro) {
  $.ajax({
    type : 'PUT',
    beforeSend: function(request) {
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
      $("#loader").show();
      request.setRequestHeader("Authorization", "Bearer " + token);
    },
    url : 'https://slinky-api.herokuapp.com/usuarios/'+queries.idUsuario,
    data: JSON.stringify(atualizarRegistro),
    dataType: "json",
    complete:function() {
      $("#loader").hide();
    },
    success: function(resposta) {
      console.log(resposta);
      window.location.href="tabela.html"
    },
    error: function(response) {
      console.log(response);
    }
  });
}


function verificarButton() {
  if(document.getElementById("submitButton").innerHTML == "Atualizar") {
    editarUsuario();
  } else {
    fazerRegistro();
  }
}

