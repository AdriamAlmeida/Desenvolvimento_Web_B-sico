/*
function getDados(){
    let email = document.getElementById('email').value;
    window.alert("Olá! O email "+ email +" foi recebido");
}
*/

function getDados(){
    let elementos = document.getElementsByName('happy');
    for(let i=0; i < elementos.length; i++)
    {
        if(elementos[i].checked){
            document.getElementById('result').innerHTML = elementos[i].value;
        }
    }
    let drink = document.querySelectorAll('#drink');
    document.getElementById('fd').innerHTML = drink.selected.value;
    //Chek boxes de musica
    let musicas = document.querySelectorAll('input[type="checkbox"]:checked');
    let text = "";
    for(i = 0; i < checkBoxes.length; i++){
        text = `${text}, ${musicas[i].value}`;
    }
    document.getElementById('#music').innerHTML = text;
}