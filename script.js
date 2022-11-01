function cadastrarPalavra() {
    //cria referencia aos elementos de entrada de dados;

    var inPalavra= document.getElementById("inPalavra");
    var inDica= document.getElementById("inDica");

    var palavra = inPalavra.value; //conteudo do input
    var dica = inDica.value;

    //validar preeenchimento(palavra sem espaço em branco)

    if(palavra == " " || dica == " " || palavra.indexOf(" ") >= 0 || dica.indexOf(" ") >= 0){
        alert("Informe uma palavra válida(sem espaços) e sua dica correspondente")
        inPalavra.focus()
        return;
    }

    //se ja existe

    if(localStorage.getItem("jogoPalavra")){
        //grava conteudo anterior + ";" e a palavra/dica
        localStorage.setItem("jogoPalavra", localStorage.getItem("jogoPalavra") + ";" + palavra);
        localStorage.setItem("jogoDica", localStorage.getItem("jogoDica") + ";" + dica);
    } else{
        //se nao, é a primeira inclusao: grava apenas a palavra e dica
        localStorage.getItem("jogoPalavra", palavra);
        localStorage.getItem("jogoDica", dica);
    }

    //verifica se salvou
    if(localStorage.getItem("jogoPalavra")){
        alert("OK! Palavra" + palavra + "Cadastrada com sucesso");
    }

    inPalavra.value = ""; //limpa campos de edição
    inDica.value = "";
    inPalavra.focus();//joga foco em inPalavra

}

    var btCadastrar = document.getElementById("btCadastrar");
    btCadastrar.addEventListener("click", cadastrarPalavra);


