

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig02 = {
  apiKey: "AIzaSyAtDNSbsG8GmxzdiumyFXjM9XulkSyhbxs",
  authDomain: "consulta-cod-cli-cbb.firebaseapp.com",
  databaseURL: "https://consulta-cod-cli-cbb-default-rtdb.firebaseio.com",
  projectId: "consulta-cod-cli-cbb",
  storageBucket: "consulta-cod-cli-cbb.appspot.com",
  messagingSenderId: "979476713391",
  appId: "1:979476713391:web:322363263f9f393305a95a"
};

// Initialize Firebase
const app02 = initializeApp(firebaseConfig02);

import {getDatabase, ref, get, child}
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"

const db02 = getDatabase();
//--------------Referencias----------------------------------------------//

var btnCli = document.getElementById("btnCli")
var inputCodCliente = document.getElementById("consulta-cod_cli")

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
inputCodCliente.addEventListener("input", function() {
  formatarCodigo(inputCodCliente);
});


function buscarPorCodigoCliente() {
 
  const codCliente = document.getElementById('consulta-cod_cli').value;

  if (!codCliente) {
    alert('Por favor, insira um Código de Cliente válido.');
    return;
  }
// Limpando o CNPJ para remover os caracteres . / -
const cod_cliLimpo = codCliente.replace(/[-]/g, '');
  
const dbref02 = ref(db02, cod_cliLimpo); // Referência direta à raiz do banco de dados

get(dbref02).then((snapshot) => {
  
  if (snapshot.exists()) {
    const data02 = snapshot.val();
      // Assumindo que os elementos HTML são elementos <p>
      document.getElementById('ficha_cli').textContent =  `Ficha: ${data02.FICHA} `|| "Não encontrado";
      document.getElementById('v1_cli').textContent =  `V1: ${data02.V1} ` || "Não encontrado";
      document.getElementById('v2_cli').textContent =  `V2: ${data02.V2} ` || "Não encontrado";
  
      // Mostrar os elementos (se estiverem ocultos)
      document.getElementById('ficha_cli').style.display = 'block';
      document.getElementById('v1_cli').style.display = 'block';
      document.getElementById('v2_cli').style.display = 'block';

	  //resultadoInput.style.margin = 'auto 0px';
	  
            
      // Tempo de visualização
      setTimeout(() => {
        document.getElementById('ficha_cli').style.display = 'none';
        document.getElementById('v1_cli').style.display = 'none';
        document.getElementById('v2_cli').style.display = 'none';
        document.getElementById('consulta-cod_cli').value = '';
      }, 15000);
    } else {
      alert("Código Cliente não encontrado.");
      document.getElementById('consulta-cod_cli').value = '';
    }
}).catch((error) => {
alert("Falha ao buscar dados: " + error.message);
console.error(error);
});
}

// Associando a função ao botão
btnCli.addEventListener('click', buscarPorCodigoCliente);