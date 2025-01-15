// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEAKJ2Z2JzIUEi4Ny7QXXUmlHP6ZNqQwY",
  authDomain: "alteraracao-setor.firebaseapp.com",
  projectId: "alteraracao-setor",
  storageBucket: "alteraracao-setor.firebasestorage.app",
  messagingSenderId: "661719354598",
  appId: "1:661719354598:web:4b9de17c706c0299fabf27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

const db = getDatabase();

var form_setor = document.getElementById("modalForm_Setor")

var Cod_cliente_setor = document.getElementById("cod_cliente_setor");
var Nome_Cliente = document.getElementById("nome_cliente_setor")
var Vendedor_Setor = document.getElementById("name_vend");
var Nome_Solicitante_Setor = document.getElementById("nome_solicitante_Setor");
var Tel_solicitante_Setor = document.getElementById("tel_solicitante_Setor")
var Obervacao_Setor = document.getElementById("observacao_Setor")
var Insbtn_Setor = document.getElementById("soli_setor");

function formatarCodigo_setor(input) {
  // Remove todos os caracteres que não sejam números
  let valor = input.value.replace(/\D/g, '');

  // Insere um hífen após os quatro primeiros dígitos
  valor = valor.replace(/(\d{4})(\d)/, '$1-$2');

  // Limita o número de dígitos para 8
  valor = valor.slice(0, 9);

  // Atualiza o valor do campo
  input.value = valor;
}
// Adiciona um ouvinte de evento "input" ao elemento
Cod_cliente_setor.addEventListener("input", function() {
  formatarCodigo_setor(Cod_cliente_setor);
});


// Adiciona um listener de evento para o input do telefone
document.getElementById('tel_solicitante_Setor').addEventListener('input', function() {
  var telefone = this.value;
  this.value = formatarTelefone(telefone);
});
// Função para formatar o número de telefone enquanto o usuário digita
function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
  telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2');
  telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
  telefone = telefone.substring(0, 15); // Limita o número de caracteres ao máximo permitido
  return telefone;
}

function alterar_Setor(){
    const dataHora = new Date();
    const horaFormatada = dataHora.toLocaleString();

if (Cod_cliente_setor.value === '') {
  alert("Preencha o código do Cliente");
  return;
}

const duas_opcao = document.querySelector('input[name="setor"]:checked').value;
const dias_opcao = document.querySelector('input[name="dia_setor"]:checked').value;
const funcaoSelecionada = document.querySelector('input[name="funcao"]:checked').value;


set(ref(db, "Solicitacao/" + "Cód Cliente: " + Cod_cliente_setor.value +
  " | Nome Cliente: " + Nome_Cliente.value +
  " | Opção: " + duas_opcao +
  " | Nome Vendedor: " + Vendedor_Setor.value +
  " | Dia de Visita: " + dias_opcao +
  " | Solicitante: " + funcaoSelecionada + 
  " | Nome Solicitante: " + Nome_Solicitante_Setor.value + 
  " | Tel Solicitante:" + Tel_solicitante_Setor.value),
  {
      Obervacao_Setor: Obervacao_Setor.value,
      Hora_da_Solicitacao: horaFormatada,
  })
  .then(() => {
    alert("Solicitacao enviada com sucesso\n Prazo de atendimento 48h");
    form_setor.reset();
  })
  .catch((error) => {
    alert("falha, error" + error);
  });
}


Insbtn_Setor.addEventListener('click', alterar_Setor);