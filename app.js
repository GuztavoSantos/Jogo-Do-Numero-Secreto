var listaDeNumerosEscolhidos = [];
var numeroMaximo = 10;
var numeroSecreto = gerarNumeroAleatorio();
var tentativas = 1;


function exibirTexto(tag, texto) {
    var campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function textoInicial() {
    exibirTexto('h1','Jogo do numero secreto');
    exibirTexto('p', `Escolha um numero entre 1 e ${numeroMaximo}`);
}
textoInicial();

function verificarChute() {
    var chute = document.querySelector('input').value;
    var palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas'
    var quatidadeDeTentativas = `Voce acertou com ${tentativas} ${palavraTentativa}`

    if (chute == numeroSecreto) {
        exibirTexto('h1','Acertou');
        exibirTexto('p', quatidadeDeTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if (chute > numeroSecreto){
        exibirTexto('p', 'o numero secreto é menor');

    } else {
        exibirTexto('p', 'o numero secreto é maior');
    }
    tentativas = tentativas + 1;
    limparCampo();
}

function gerarNumeroAleatorio() {
    var numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    var quantidadeDeNumerosNaLista = listaDeNumerosEscolhidos.length;

    if (quantidadeDeNumerosNaLista == numeroMaximo) {
        listaDeNumerosEscolhidos = []
    }

   if (listaDeNumerosEscolhidos.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosEscolhidos.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    textoInicial();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled',true);
}