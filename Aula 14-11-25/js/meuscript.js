function pesquisacep(valor){
    var cep = valor.replace(/\D/g, ''); //substitua tudo que não for digito.
    //console.log(cep)


    if(cep !== ""){ //Verifica se campo cep possui valor informado.
        let valdiacep = /^[0-9]{8}$/; //Expressão regular para validar o CEP.
        if(valdiacep.test(cep)){ //Valida o formato do CEP.

            //Preenche os campos com "..." enquanto consulta webservice.
            let inputs = document.querySelectorAll('.endereco');

            for(let i = 0; i < inputs.length; i++){
                inputs[i].value = "...";
            }
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            alert("Formato de CEP inválido.");
        }
    }
}

function meu_callback(conteudo){
    if(!("erro" in conteudo)){
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('uf').value = conteudo.estado;
        document.getElementById('ibge').value = conteudo.ibge;
    }
}