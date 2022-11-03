var palavraSorteada;        //vriaveis globais
var dicaSorteada;

//cria referencia aos elemntos que irao conter eventos associados a functions

var inLetra = document.getElementById("inLetra");
var btJogar = document.getElementById("btJogar");
var btVerDica = document.getElementById("btVerDica");

function montarJogo(){
    //cria referencia ao local onde a palavra sorteada (letra inical e _) é exibida
    var outPalavra = document.getElementById("outPalavra");

    //obtem conteudo do localStorage e separa em elementos de vetor
    var palavras = localStorage.getItem("jogoPalavra").split(";");
    var dicas = localStorage.getItem("jogoDica").split(";");

    var tam = palavras.length;   //numero de palavras cadastradas

    //gera um numero entre 0 e tam-1 (pois arredonda pra baixo)
    var numAleatorio = Math.floor(Math.random() * tam);

    //obtem palavra(em letras maiusculas) e dica na posição do nº aleatorio gerado

    palavraSorteada = palavras[numAleatorio].toUpperCase();
    dicaSorteada = dicas[numAleatorio];
    var novaPalavra = "";  //para montar a palavra exigibida(com letra inicial e "_");

    // for para exibir a letra inical e as demais ocorrencias desta letra na palavra
    for(var i = 0; i < palavraSorteada.length; i++){
        //se igual a letra inicial, acrescenta esta letra na exibição
        if(palavraSorteada.charAt(0) == palavraSorteada.charAt(i)){
            novaPalavra += palavraSorteada.charAt(0);
        } else {
            novaPalavra += "_";
        }
    }
    outPalavra.textContent = novaPalavra;
}

if(localStorage.getItem("jogoPalavra")){
    montarJogo();
} else {
    alert("Cadastre palavras para jogas");
    inLetra.disabled = true;
    btJogar.disabled = true;
    btVerDica.disabled = true;
}

function mostrarDica(){
    //cria referencia aos elementos da pagina a serem alterados nesta function
    var outErros = document.getElementById("outErros");
    var outDica = document.getElementById("outDica");
    var outChances = document.getElementById("outChances");

    var erros = outErros.textContent;

    //verifica se o jogador já clicou anteriormente no botão

    if(erros.indexOf("*") >= 0){
        alert("Você já solicitou a dica...");
        inLetra.focus();
        return;
    }

    outDica.textContent = " * " + dicaSorteada;
    outErros.textContent = erros + "*";
    var chances = Number(outChances.textContent) - 1;
    outChances.textContent = chances;

    trocarStatus(chances);

    verificarFim();

    inLetra.focus();
}
//associa ocorrencia do evento click deste elemento à function mostrarDica();
btVerDica.addEventListener("click", mostrarDica);

function trocarStatus(num){
    if(num>=0){
        var imgStatus = document.getElementById("imgStatus");
        imgStatus.src = "img/status" + num + ".png";
    }
}

function jogarLetra(){
    var outPalavra = document.getElementById("outPalavra");
    var outErros = document.getElementById("outErros");
    var outChances = document.getElementById("outChances");

    //obtem conteudo do campo inLetra e converte-o para maiuscula
    var letra = inLetra.value.toUpperCase();

    //valida o preenchimento de uma única letra;
    if(letra == " " || letra.length > 2){
        alert("Informe uma letra");
        inLetra.focus();
        return;
    }

    var erros = outErros.textContent;
    var palavra = outPalavra.textContent;

    //se a letra apostada já consta em erros, significa que ele já apostou esta letra
    if (erros.indexOf(letra) >= 0 || palavra.indexOf(letra) >= 0){
        alert("Você ja apostou esta letra");
        inLetra.focus();
        return;
    }

    if (palavraSorteada.indexOf(letra) >= 0){

        var novaPalavra = "";
        //for para montar palavra a ser exibida
        for(var i = 0; i < palavraSorteada.length; i++){
            //se igual a letra apostada, acrescenta essa letra na exibição
            if(palavraSorteada.charAt(i) == letra){
                novaPalavra += letra;
            } else {
                novaPalavra += palavra.charAt(i);
            }
        }

        outPalavra.textContent = novaPalavra;
    } else {
        erros += letra;
        outErros.textContent = erros;
        var chances = Number(outChances.textContent) - 1;
        outChances.textContent = chances;

        trocarStatus(chances);
    }

    verificarFim();

    inLetra.value = "";
    inLetra.focus();
}

btJogar.addEventListener("click", jogarLetra);

inLetra.addEventListener("keypress", function(tecla){
    if(tecla.key == 13){
        jogarLetra();
    }
});


function verificarFim(){
    var outChances = document.getElementById("outChances");
    var outMensagemFinal = document.getElementById("outMensagemFinal");

    var chances = Number(outChances.textContent);

    if (chances == 0){
        //display -3 é um estilo de bootstrap
        outMensagemFinal.className = "display-3 fonteVermelho";
        outMensagemFinal.textContent = "Ah... é " + palavraSorteada + ". Você Perdeu!";
        concluirJogo();
    } else if (outPalavra.textContent == palavraSorteada){
        outMensagemFinal.className = "display-3 fonteAzul";
        outMensagemFinal.textContent = "Parabéns!!, Você Ganhou.";
        concluirJogo();
    }
}

//function concluirJogo, modifica o texto da dica e desabilita os botões de jogas
function concluirJogo(){
    var outDica = document.getElementById("outDica");
    outDica.textContent = "* Clique no botão 'Iniciar Jogo' para jogar novamente";
    inLetra.disabled = true;
    btJogar.disabled = true;
    btVerDica.disabled = true;
}