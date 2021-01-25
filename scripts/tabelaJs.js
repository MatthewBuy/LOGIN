  var tbody = document.getElementById("tbody");
  var token = window.localStorage.getItem("token"); //verifico se no storage existe o token, e se esxistir a variavel recebe o valor.
  var contadorDePagina = 1;

  if(token == null){
    alert("Você não está autenticado");
    location.href="index.html";
  }
 
console.log(window.location.search);
  
TabelaUsuarios(1);
  
function Editar(id) {
  console.log(id);
  location.href="registrar.html?idUsuario="+id;
}

function Deletar(id, nome) {
  console.log(id); 
  var resultado = confirm("Deseja excluir o usuário: " +  nome + " ?")
        if(resultado == true) {
          alert("O usuário: " + nome + " será excluído da lista!")
          DeletarUsuario(id)
        }
        else {
          alert("Você desistiu de excluir o usuário: " + nome + " da lista.")
        }
}




String.format = function() {
  var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {       
      var reg = new RegExp("\\{" + i + "\\}", "gm");             
      s = s.replace(reg, arguments[i + 1]);
    }
  return s;
}

function logOut(){
    localStorage.removeItem('token');
    location.href="index.html";
}

function TabelaUsuarios(paginas) {
  $.ajax({
    type : 'GET',
    beforeSend: function(request) {
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
      request.setRequestHeader("Authorization", "Bearer " + token);
    },
    url : 'https://slinky-api.herokuapp.com/usuarios?tamanho_pagina=30&pagina=1&asc=false',
    dataType: "json",
    success: function(resposta) {
      var array = resposta.items;
      var maximoItems = 10;
      var pagina = paginas;
    

      let totalPagina = Math.ceil( array.length / maximoItems);
      let contador = (  pagina * maximoItems ) - maximoItems;
      let delimitador = contador + maximoItems;

      if(pagina <= totalPagina) {
        for(let i=contador; i<delimitador; i++){
          if(array[i] != null){
            var usuario = array[i];
            var ati;
            
            if(array[i].ativo == true) {
                ati = array[i].ativo = "Ativo"
            } else {
                ati = array[i].ativo = "Inativo"
            }    
            
            var colunas = "<tr><td>  <button id='edit' onclick='Editar({0})' type='button'>"+"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>"+"<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/>"+"<path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/>"+"</svg>"+"</button>"+"<button id='edit' onclick='Deletar({0}, {1})' type='button'>"+"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-x' viewBox='0 0 16 16'>"+"<path d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>"+"<path fill-rule='evenodd' d='M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/>"+"</svg> </button>"+"</td><td>{5}</td><td>{2}</td><td>{3}</td><td>{4}</td></tr>";

            var colunasComValores = String.format(colunas, "\"" + usuario.public_id + "\"","\"" + usuario.nome + "\"", usuario.email, usuario.tipo, ati, usuario.nome);

            tbody.innerHTML += colunasComValores;
          }
          contador++;
        }


       
        
      }
  
     
      /*for(var i = 0; i < array.length; i++) {
        var usuario = array[i];
        var ati;
    

        if(array[i].ativo == true) {
            ati = array[i].ativo = "Ativo"
        } else {
            ati = array[i].ativo = "Inativo"
        }    
        

        var colunas = "<tr><td>  <button id='edit' onclick='Editar({0})' type='button'>"+"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>"+"<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/>"+"<path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/>"+"</svg>"+"</button>"+"<button id='edit' onclick='Deletar({0}, {1})' type='button'>"+"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-x' viewBox='0 0 16 16'>"+"<path d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>"+"<path fill-rule='evenodd' d='M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/>"+"</svg> </button>"+"</td><td>{5}</td><td>{2}</td><td>{3}</td><td>{4}</td></tr>";

        var colunasComValores = String.format(colunas, "\"" + usuario.public_id + "\"","\"" + usuario.nome + "\"", usuario.email, usuario.tipo, ati, usuario.nome);

        tbody.innerHTML += colunasComValores;

        
      }/*

     /* $('.demo2').bootpag({
        total: 23,
        page: 3,
        maxVisible: 10
      }).on('page-item', function(event, resposta){
         $(".pagination").html("Page-item " + resposta); // or some ajax content loading...
      });*/

    }    
  });
}


function DeletarUsuario(queries) {
 
  $.ajax({
    type : 'DELETE',
      beforeSend: function(request) {
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        $("#loader").show();
        request.setRequestHeader("Authorization", "Bearer " + token);
      },
    url : 'https://slinky-api.herokuapp.com/usuarios/'+queries,
    dataType: "json",
    complete:function(){
      $("#loader").hide();
    },
    success: function(resposta){
      console.log(resposta)
      window.location.reload()
      },
    
    error: function(resposta){
      console.log(resposta);
    }
  });
}

$( document ).ready(function() {
  var current_page = 1;
  var total_pages = $('#pagination').children('div').length;
  $('#page_command').on('click', function(){
      for (i=1;i<total_pages+1; i++){
          $("#page" + i).hide();
      }
      current_page++;
      $("#page" + current_page).slideDown(1000);
      if (current_page == total_pages)
          current_page = 0;
  });
});

function proximoAnterior(pagina){
  contadorDePagina += pagina;
  TabelaUsuarios(contadorDePagina);
  $("#table tr").remove();
}

function paginaUnica(botaoUnico){
  contadorDePagina = botaoUnico;
  TabelaUsuarios(contadorDePagina);
  $("#table tr").remove();
}


