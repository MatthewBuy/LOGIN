
function fazerRegistro () {
    var nome = document.querySelector("#nome");
    var email = document.querySelector("#email");
    var repSenha = document.querySelector("#repetirSenha");
    var senha = document.querySelector("#senha");

    var registro = {
        nome : nome.value,
        email : email.value,
        senha : senha.value,
        repSenha : repSenha.value
    };

    console.log(registro);

    if(senha.value == repSenha.value){
        $.ajax({
            type : 'POST',
            beforeSend: function(request) {
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("Access-Control-Allow-Origin", "*");
              },
            url : 'https://slinky-api.herokuapp.com/login',
            data: JSON.stringify(registro),
            dataType: "json",
            success: function(resposta){
                console.log(resposta);
            }
    
        });
    }else{
        alert("As senhas não batem.")
    }

  

    

}