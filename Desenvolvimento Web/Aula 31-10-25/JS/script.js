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
}

let drink = document.querySelectorAll('#drink');
document.getElementById('fd').innerHTML = drink.selected.value;