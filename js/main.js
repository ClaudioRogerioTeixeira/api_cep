'use strict';

const preencherFormulario = (endereco) => {
  document.getElementById('InputEndereco').value = endereco.logradouro;
  document.getElementById('msgCep').textContent = '';
  document.getElementById('InputBairro').value = endereco.bairro;
  document.getElementById('InputCidade').value = endereco.localidade;
  document.getElementById('InputUf').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
  limpaFormulario();
  const cep = document.getElementById('InputCep').value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json()
    if (endereco.hasOwnProperty('erro')) {
      console.log(endereco);
      limpaFormulario();
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById('msgCep').textContent = 'Cep Inválido';
  }
}

function limpaFormulario() {
  document.getElementById('InputEndereco').value = '';
  document.getElementById('InputNumero').value = '';
  document.getElementById('InputBairro').value = '';
  document.getElementById('InputCidade').value = '';
  document.getElementById('InputUf').value = '';
  document.getElementById('msgCep').textContent = 'Cep não Encontrado';
}

// .then
// const pesquisarCep = () => {
//   const cep = document.getElementById('InputCep').value;
//   const url = `http://viacep.com.br/ws/${cep}/json/`;
//   fetch(url).then(resposta => resposta.json()).then(console.log);
// }

document.getElementById('InputCep').addEventListener('focusout', pesquisarCep);
