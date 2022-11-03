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
            novaPalavra += " _ ";
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