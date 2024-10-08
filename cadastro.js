// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYYp97Ao7-_DxxGmTu7NPRDC2FZdJFLDg",
  authDomain: "cbb-cadastro.firebaseapp.com",
  databaseURL: "https://cbb-cadastro-default-rtdb.firebaseio.com",
  projectId: "cbb-cadastro",
  storageBucket: "cbb-cadastro.appspot.com",
  messagingSenderId: "826130353391",
  appId: "1:826130353391:web:3d1ca11f63fc22afc8df1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js"

const db = getDatabase();

var form_cadastro = document.getElementById("modalForm_cadastro")
var RazaoSocial = document.getElementById("razao_social");
var CnpjCpf = document.getElementById("cnpj_cpf"); 
var NomeFantasia = document.getElementById("nome_fantasia");
var TelWhats = document.getElementById("tel_whats");
var Email = document.getElementById("e_mail");
var Vendedor = document.getElementById("vendedor");
var Supervisor = document.getElementById("supervisor");
var DiaVisita = document.getElementById("dia_visita");

var btnEnviar = document.getElementById("cadastro");


function formatarDocumento(input) {
  let documento = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (documento.length <= 11) {
    // Formatação para CPF
    documento = documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (documento.length <= 14) {
    // Formatação para CNPJ
    documento = documento.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  input.value = documento;
}

CnpjCpf.addEventListener('input', () => {
  formatarDocumento(CnpjCpf);
});

// Função para formatar o número de telefone enquanto o usuário digita
function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
  telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2');
  telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
  telefone = telefone.substring(0, 15); // Limita o número de caracteres ao máximo permitido
  return telefone;
}

// Adiciona um listener de evento para o input do telefone
document.getElementById('tel_whats').addEventListener('input', function() {
  var telefone = this.value;
  this.value = formatarTelefone(telefone);
});

function Solicitar_cadastro(){
  const dataHora_cad = new Date();
  const horaFormatada_cad = dataHora_cad.toLocaleString();

  // Condição para o preenchimento do CNPJ/CPF
  if (CnpjCpf.value === '') {
  alert("Preencha o CNPJ/CPF");
  return;
  }

  // Validação do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email.value)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
  }

set(ref(db, "Cadastro/" + RazaoSocial.value),
{
    Cnpj_CPF: CnpjCpf.value,
    Nome_Fantasia: NomeFantasia.value,
    Tel_Whats_App: TelWhats.value,
    Email: Email.value,
    Vendedor: Vendedor.value,
    Supervisor: Supervisor.value,
    Dia_Visita: DiaVisita.value,
    Hora_do_Cadastro: horaFormatada_cad,
})
.then(() => {
  alert("Solicitação enviada com sucesso");
  alert("O setor de cadastro entrará em contato para solicitar documentos adicionais caso necessário.");
  alert("Documentos PJ:\n- CNH ou RG do Sócio ADM\n- Comprovante de Residência\n- Foto da Fachada\n- Ficha de Cadastro\nDocumentos PF:\n-CNH ou RG\n- Comprovante de Residência\n- Foto da Fachada\n- Ficha de Cadastro");
 
  form_cadastro.reset();
})
.catch((error) => {
  alert("falha, error" + error);
});
}

btnEnviar.addEventListener('click', Solicitar_cadastro);

