function montarTabela() {
    //se houver dados salvos em localStorage

    if(localStorage.getItem("jogoPalavra")){
        //obtem conteudo e converte em elementos de vetor(na ocorrencia ";")
        var palavras = localStorage.getItem("jogoPalavra").split(";");
        var dicas = localStorage.getItem("jogoDica").split(";");

//cria referencia ao elemento tbPalavras
    var tbPalavras = document.getElementById("tbPalavras");

    var linha, col1, col2, col3;

//percorre elementos do vetor e os insere na taela

for(var i = 0; i < palavras.length; i++){

    linha = tbPalavras.insertRow(-1) //adiciona uma linha a tabala

    col1 = linha.insertCell(0); //cria colunas
    col2 = linha.insertCell(1);
    col3 = linha.insertCell(2);

    col1.textContent = palavras[i]; //joga o conteudo em uma celula
    col2.textContent = dicas[i];
    col3.innerHTML = "<input type='checkbox'> ";

        }
    }
}

//cria referencia ao ckMostar(se marcado, deve exibir tabela e botao excluir)
var ckMostar = document.getElementById("ckMostrar");
//cria function anonima, associada ao evento chance do ckMostrar
ckMostar.addEventListener("change", function(){
    if(ckMostar.checked){                                           //se marcado
        montarTabela();                                             //exibe tabela(palavras e dicas)        
        btExcluir.className = "btn btn-danger exibe";               //exibe o botao Excluir        
    } else {                                                        // senao
        location.reload();                                          //recarrega a pagina
    }
});

//cria referencia ao checkbox ckTodos(na linha de titulo da tabela)
var ckTodos = document.getElementById("ckTodos")
//executa funcao anonima quando houver uma troca de status
ckTodos.addEventListener("change", function(){
    //cria referencia a tabela e aos campos input(filhos da tabela);
    var tbPalavras = document.getElementById("tbPalavras");
    var ckExcluir = tbPalavras.getElementsByTagName("input");

    var status = ckTodos.checked; //obtem o status;

    //e percorre os demais checkbox para aplicar esse status
    for(var i = 1; i < ckExcluir.length ; i++){
        ckExcluir[i].checked = status;
    }

});

function removerPalavras(){
    //cria referencia a tabela e aos campos input(filgos da tabela)
    var tbPalavras = document.getElementById("tbPalavras");
    var ckExcluir = document.getElementsByTagName("input");
    //var palavras = localStorage.getItem("jogoPalavra");

    
    var temSelecionado = false;

    //percorrer campos input type checkbox da tabela (exceto "Todos" no titulo)
    for (var i = 1; i < ckExcluir.length; i++){
        if (ckExcluir[i].checked){
            temSelecionado = true;
            break;
        }
    }

    if (!temSelecionado){
        alert("Não há palavras selecionadas para exclusao")
        return;
    }

    //solicita confirmação de exclusao das palavras selecionadas
    if(confirm("Confirma Exclusão das Palavras Selecionadas?")){

        //exclui conteudo armazenado em localStorage
        localStorage.removeItem("jogoPalavra");
        localStorage.removeItem("jogoDica");

        palavras = "";
        dicas = "";

        //primeiro ira gravar em localStorage as palavras nao selecionadas
        for (i = 1; i < ckExcluir.length; i++){
            //senao esta selecionado(para exclusao)
            if (!ckExcluir[i].checked){
                //obetem o conteudo da tabela(coluna 0: palavra; coluna 1: dica)
                palavras += tbPalavras.rows[i].cells[0].textContent + ";";
                dicas += tbPalavras.rows[i].cells[1].textContent + ";";
            }
        }

        //se vazio, significa que marcou todos checkbox(nao salva em localStorage)
        if(palavras != ""){
            //.length-1(para retirar o ultimo";")
            localStorage.setItem("jogoPalavra", palavras.substr(0 , palavras.length - 1));
            localStorage.setItem("jogoDica", dicas.substr(0 , dicas.length - 1));
        }

        //agora ira remover as linhas selecionadas (do fim para o inicio)
        for ( i = ckExcluir.length - 1; i > 0 ; i--){
            if(ckExcluir[i].checked){
                tbPalavras.deleteRow(i) //remove linha
            }
        }
        ckExcluir[0].checked = false;  //desmarca ckTodos(que é o input 0)
    }
}

var btExcluir = document.getElementById("btExcluir");
btExcluir.addEventListener("click", removerPalavras);
