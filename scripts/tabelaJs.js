  var teste = document.getElementById("tbody");
  teste.innerHTML="";

  var token = window.localStorage.getItem("token");

  var options = document.getElementById("options");

  
  
  $.ajax({
    type : 'GET',
    beforeSend: function(request) {
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        request.setRequestHeader("Authorization", "Bearer " + token);
      },
    url : 'https://slinky-api.herokuapp.com/usuarios',
    //data: JSON.stringify(informacoes),
    dataType: "json",
    success: function(resposta){
      var array = resposta.items;
     
      for(var i = 0; i < array.length; i++){
        var newButton = document.createElement("button");
          var ati;
          if(array[i].ativo == true){
            ati = array[i].ativo = "Ativo"
          }else {
            ati = array[i].ativo = "Inativo"
          }    

          teste.innerHTML += "<tr><td>"+options.innerHTML + "<button onclick='Editar()' type='button'>Editar</button>"
          +"</td><td>"+array[i].nome+"</td><td>"+array[i].email+"</td><td>"+array[i].tipo+"</td><td>"+ati+"</td></tr>";
        
      }
    }    
});


function Editar(){
  location.href="registrar.html";
}







