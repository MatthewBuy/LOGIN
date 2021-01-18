  var tbody = document.getElementById("tbody");
  var token = window.localStorage.getItem("token");
 
  console.log(window.location.search);
  
  $.ajax({
    type : 'GET',
    beforeSend: function(request) {
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        request.setRequestHeader("Authorization", "Bearer " + token);
      },
    url : 'https://slinky-api.herokuapp.com/usuarios',
    dataType: "json",
    success: function(resposta){
      var array = resposta.items;

      for(var i = 0; i < array.length; i++){
        var usuario = array[i];
          var ati;
  
          if(array[i].ativo == true){
            ati = array[i].ativo = "Ativo"
          }else{
            ati = array[i].ativo = "Inativo"
          }    

          var colunas = "<tr><td> <button id='edit' onclick='Editar({0})' type='button'>Editar</button>"
                    +"</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td></tr>";

          var colunasComValores = String.format(colunas, "\"" + usuario.public_id + "\"", usuario.nome, usuario.email, usuario.tipo, ati);

          tbody.innerHTML += colunasComValores;

         
      }
    }    
});



function Editar(id) {
  console.log(id);

  var url = location.href="registrar.html?idUsuario="+id;
  
}

String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}







