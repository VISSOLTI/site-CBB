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
var Canal = document.getElementById("canal");
var TelCliente = document.getElementById("tel_cliente");
var Email = document.getElementById("e_mail");
var Vendedor = document.getElementById("vendedor");
var Supervisor = document.getElementById("supervisor");
var DiaVisita = document.getElementById("dia_visita");
var Nome_Solicitante_cad = document.getElementById("nome_solicitante_cad")
var Tel_solicitante_cad = document.getElementById("tel_solicitante_cad")
var Observacao = document.getElementById("observacao")
var btnEnviar = document.getElementById("cadastro");
var btnClose = document.getElementById("closeModal")


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
document.getElementById('tel_cliente').addEventListener('input', function() {
  var telefone = this.value;
  this.value = formatarTelefone(telefone);
});
document.getElementById('tel_solicitante_cad').addEventListener('input', function() {
  var telefone = this.value;
  this.value = formatarTelefone(telefone);
});

function closeModal() {
  const modal = document.getElementById('modalSucesso');
  modal.style.display = 'none';
}

//const cod = document.getElementById('razao_social').value;

function Solicitar_cadastro(){
  const dataHora_cad = new Date();
  const horaFormatada_cad = dataHora_cad.toLocaleString();


  // Condição para o preenchimento Razão Social
  if (RazaoSocial.value === '') {
    alert("Preencha o Razao Social!");
    return;
  }
  // Condição para o preenchimento do CNPJ/CPF
  if (CnpjCpf.value === '') {
  alert("Preencha o CNPJ/CPF");
  return;
  }

  const funcaoSelecionada_cad = document.querySelector('input[name="funcao"]:checked').value;

  // Validação do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email.value)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
  }

  // Remover caracteres . / , do campo RazaoSocial
  const razaoSocialSemCaracteres = RazaoSocial.value.replace(/[.,/]/g, '');

set(ref(db, "Cadastro/" + razaoSocialSemCaracteres),
{
    Cnpj_CPF: CnpjCpf.value,
    Nome_Fantasia: NomeFantasia.value,
    Canal: Canal.value,
    Tel_Cliente: TelCliente.value,
    Email: Email.value,
    Vendedor: Vendedor.value,
    Supervisor: Supervisor.value,
    Dia_Visita: DiaVisita.value,
    Nome_Solicitante:  Nome_Solicitante_cad.value,  
    Tel_Solicitante:  Tel_solicitante_cad.value,
    Solicitante: funcaoSelecionada_cad, 
    Hora_do_Cadastro: horaFormatada_cad, 
    Observacao: Observacao.value
} )
.then(() => {
  
  // Mostrar o modal
  const modal = document.getElementById('modalSucesso');
  modal.style.display = 'block'

  form_cadastro.reset();
})
.catch((error) => {
  alert("falha, error" + error);
});
}


btnClose.addEventListener('click', closeModal);
btnEnviar.addEventListener('click', Solicitar_cadastro);

