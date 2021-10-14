const express = require('express');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('www'));

const port = 3000

const jogadas = [];

//método post
app.post('/jogo', (req, res) => {
    const jogoUsuario = req.body.jogoUsuario;

    // função que retorna um número randômico
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // função que recebe o número randômico por parâmetro e verifica se é pedra, papel ou tesoura
    function getOpcao(number) {
        switch (number) {
            case 0:
                return "pedra";
            break;
            case 1: 
                return "papel";
            break;
            case 2:
                return "tesoura";
            break;
        }
    }
    
    // função que recebe por parâmetro a jogada do usuário e a jogada do pc (randomica), faz a comparação entre elas e retorna a mensagem do feedback
    function logicGame(jogoUsuario, jogoPC){
        if (jogoUsuario === jogoPC) {
            return "Houve um empate";
        }else if(jogoUsuario === "papel" && jogoPC === "tesoura" || jogoUsuario === "tesoura" && jogoPC === "pedra" || jogoUsuario === "pedra" && jogoPC === "papel"){
            return "Poxa! Você perdeu!";
        }else if(jogoUsuario === "tesoura" && jogoPC === "papel" || jogoUsuario === "papel" && jogoPC === "pedra"|| jogoUsuario === "pedra" && jogoPC === "tesoura"){
            return "Aeee! Ganhou!";
        }
    }

    // cria uma constante que chama a função para gerar um número randômico entre 0 e 3
    const numeroRandomico = getRandom(0,3);

    //cria o jogoPC que chama a função getOpcao passando por parametro o número randômico 
    const jogoPC = getOpcao(numeroRandomico);

    //função que atribui o retorno da função logicGame ao const feedback, depois de ter passado por parâmetro jogoUsuario e jogoPC
    const feedback = logicGame(jogoUsuario, jogoPC);

    //adiciona um ou mais elementos ao final do array jogadas
    jogadas.push({
        jogoUsuario,
        jogoPC,
        feedback
    })
    res.json({ message: `PC jogou: ${jogoPC}`});
})


//método get
app.get('/jogo', (req, res) => {
    res.json(jogadas);
})


app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})
