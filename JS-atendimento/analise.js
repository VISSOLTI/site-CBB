// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqgXfS7tWD0J7uAg_RC3OGPZWppZWIock",
  authDomain: "cbb-analise-prorrogacao.firebaseapp.com",
  projectId: "cbb-analise-prorrogacao",
  storageBucket: "cbb-analise-prorrogacao.firebasestorage.app",
  messagingSenderId: "544116865345",
  appId: "1:544116865345:web:fde52d99c5eccd46b189c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, ref, set}
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js"

const db = getDatabase();

// Elementos do modal de análise
const openModalAnaliseButton = document.getElementById('openModalButton_Analise');
const modalAnalise = document.getElementById('modal_Analise');
const closeModalAnaliseButton = document.querySelector('#modal_Analise .close-button_cadastro');
const modalFormAnalise = document.getElementById('modalForm_Analise');
const codClienteAnaliseInput = document.getElementById('cod_cliente_Analise');
const numeroNFInput = document.getElementById('numero_NF');
const prazoDesejadoInput = document.getElementById('prazo_desejado');
const nomeSolicitanteAnaliseInput = document.getElementById('nome_solicitante_Analise');
const whatsSolicitanteAnaliseInput = document.getElementById('whats_solicitante_Analise');
const observacaoPrazoTextarea = document.getElementById('observacao_Setor'); // Correção do ID
const enviarAnaliseButton = document.getElementById('solicitar_analise'); // Correção do ID

// Função para formatar o número de WhatsApp enquanto o usuário digita
function formatarWhatsApp(whatsapp) {
  whatsapp = whatsapp.replace(/\D/g, ''); // Remove caracteres não numéricos
  whatsapp = whatsapp.replace(/^(\d{2})(\d)/, '($1) $2');
  whatsapp = whatsapp.replace(/(\d{4,5})(\d{4})/, '$1-$2');
  whatsapp = whatsapp.substring(0, 15); // Limita o número de caracteres ao máximo permitido
  return whatsapp;
}

codClienteAnaliseInput.addEventListener('input', function() {
    // Remove todos os caracteres não numéricos
    let value = this.value.replace(/\D/g, '');
  
    // Aplica a máscara 0000-0000
    if (value.length > 4) {
      value = value.substring(0, 4) + '-' + value.substring(4, 8);
    } else if (value.length > 8) {
      value = value.substring(0, 8); // Limita a 8 dígitos
    }
  
    this.value = value;
  });



// Adiciona um listener de evento para o input do WhatsApp na análise
whatsSolicitanteAnaliseInput.addEventListener('input', function() {
  this.value = formatarWhatsApp(this.value);
});

// Abre o modal de análise
openModalAnaliseButton.addEventListener('click', () => {
  modalAnalise.style.display = 'block';
});

// Fecha o modal de análise ao clicar no botão de fechar
closeModalAnaliseButton.addEventListener('click', () => {
  modalAnalise.style.display = 'none';
  modalFormAnalise.reset(); // Limpa o formulário ao fechar
});

// Fecha o modal de análise ao clicar fora do modal
window.addEventListener('click', (event) => {
  if (event.target === modalAnalise) {
    modalAnalise.style.display = 'none';
    modalFormAnalise.reset(); // Limpa o formulário ao fechar
  }
});

// Função para enviar a solicitação de análise de prorrogação
function enviarSolicitacaoAnalise() {
  const dataHoraAnalise = new Date();
  const horaFormatadaAnalise = dataHoraAnalise.toLocaleString();

  if (codClienteAnaliseInput.value === '') {
    alert("Preencha o campo Código do Cliente");
    return;
  }

  if (numeroNFInput.value === '') {
    alert("Preencha o campo Número da NF");
    return;
  }

  if (prazoDesejadoInput.value === '') {
    alert("Preencha o campo Prazo Desejado");
    return;
  }

  if (nomeSolicitanteAnaliseInput.value === '') {
    alert("Preencha o campo Nome do Solicitante");
    return;
  }

  if (whatsSolicitanteAnaliseInput.value === '') {
    alert("Preencha o campo WhatsApp do Solicitante");
    return;
  }

  // Salvar os dados no Firebase
  set(ref(db, "Solicitações_Prorrogação/" + "Cód Cliente: " + codClienteAnaliseInput.value),
  {
    código_cliente: codClienteAnaliseInput.value,
    número_nf: numeroNFInput.value,
    prazo_desejado: prazoDesejadoInput.value,
    nome_solicitante: nomeSolicitanteAnaliseInput.value,
    whatsapp_solicitante: whatsSolicitanteAnaliseInput.value,
    observação: observacaoPrazoTextarea.value,
    Hora_Solicitação_Análise: horaFormatadaAnalise
  })
  .then(() => {
    alert("Solicitação de análise enviada com sucesso!");
    modalAnalise.style.display = 'none';
    modalFormAnalise.reset();
  })
  .catch((error) => {
    alert("Falha ao enviar solicitação: " + error);
  });
}

// Adiciona um listener de evento para o botão de enviar análise
enviarAnaliseButton.addEventListener('click', enviarSolicitacaoAnalise);