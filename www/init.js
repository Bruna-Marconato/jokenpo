//função que mostra o card do feedback do usuário
function init(){
   let lista = $('.list').html('');

    if(lista){
        lista.removeAttribute = "display";
    }

}

//função que recebe a opção selecionada pelo usuário, faz o post e chama a função listar passando por parâmetro a opção
function jogar(opcao){
    $.ajax({
        type: 'post', 
        url: '/jogo',
        data: JSON.stringify({ jogoUsuario: opcao}),  
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert(data.message);
            listar(opcao);
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}


function listar(opcao){
    //limpa a lista para não duplicar os elementos
    $('.list').html('');

    $.ajax({
        type: 'get', 
        url: '/jogo',
        data: JSON.stringify({ jogoUsuario: opcao}),  
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
        //remove o último elemento de um array
           let novoArray = data.pop();
            $('.list').append(`
            <div class="col-12 col-md-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${novoArray.feedback}</h5>
                        <h5 class="card-title">${novoArray.jogoUsuario} x ${novoArray.jogoPC}</h5>
                    </div>
                </div>
            </div>
            `);
           
           
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}

