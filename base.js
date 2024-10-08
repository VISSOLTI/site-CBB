// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyhftZU4NGYnsbHRETPMFvIaCRIKUCTWM",
  authDomain: "cbb-alteracaoprazo.firebaseapp.com",
  projectId: "cbb-alteracaoprazo",
  storageBucket: "cbb-alteracaoprazo.appspot.com",
  messagingSenderId: "778482695772",
  appId: "1:778482695772:web:64c8d593844ab7e55cf099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

const db = getDatabase();

var form = document.getElementById("modalForm")
var Superior = document.getElementById("name_sup");
var Vendedor = document.getElementById("name_vend");
var Cod_vend = document.getElementById("cod_vend");
var Cod_cliente = document.getElementById("cod_cliente");
var Tel_solicitante = document.getElementById("tel_solicitante")
var Prazo = document.getElementById("prazo");
var Insbtn = document.getElementById("soli");

function formatarCodigo(input) {
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
Cod_cliente.addEventListener("input", function() {
  formatarCodigo(Cod_cliente);
});

function Solicitar(){
    const dataHora = new Date();
    const horaFormatada = dataHora.toLocaleString();

if (Cod_cliente.value === '') {
  alert("Preencha o código do Cliente");
  return;
}

const funcaoSelecionada = document.querySelector('input[name="funcao"]:checked').value;

set(ref(db, "Solicitacao/" + "Cód Cliente: " + Cod_cliente.value + 
  "| Nome Superior: " + Superior.value +
  "| Nome Vendedor: " + Vendedor.value + "| Cód Vendedor: " + 
  Cod_vend.value + "| Prazo: " + Prazo.value + "| Tel Solicitante:" + Tel_solicitante.value +
"| Solicitante: " + funcaoSelecionada),
  {
      Hora_da_Solicitacao: horaFormatada,
  })
  .then(() => {
    alert("Solicitacao enviada com sucesso\n Prazo de atendimento 48h");
    form.reset();
  })
  .catch((error) => {
    alert("falha, error" + error);
  });
}

Insbtn.addEventListener('click', Solicitar);