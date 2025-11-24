function exibir(){
    let paragrafo = document.getElementById("nome");
    console.log(paragrafo);
    paragrafo.innerHTML = 'HelloWorld!';
}

// Escreva a função ocultar que apaga o texto do paragrafo "nome"

function ocultar(){
    document.getElementById("nome").innerHTML = '';
}

function ligar(){
    document.getElementById('lamp').src = 'imagens/pic_bulbon.gif';
}

function desligar(){
    document.getElementById('lamp').src = 'imagens/pic_bulboff.gif';
}