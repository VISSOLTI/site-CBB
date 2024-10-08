// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwl0JvXHZMnLsic2zS2bu0Ne8jlqlRMZY",
  authDomain: "consulta-cbb.firebaseapp.com",
  databaseURL: "https://consulta-cbb-default-rtdb.firebaseio.com",
  projectId: "consulta-cbb",
  storageBucket: "consulta-cbb.appspot.com",
  messagingSenderId: "564790071043",
  appId: "1:564790071043:web:fa361e6e001fb523056336"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const db = getDatabase();

var selBtn = document.getElementById("Selbtn")
var inputCpnjCpf = document.getElementById("consulta-cnpj_cpf")

function formatarDocumento(input) {
  let documento = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  if (documento.length <= 12) {
    // Formatação para CPF
    documento = documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (documento.length <= 15) {
    // Formatação para CNPJ
    documento = documento.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  input.value = documento; //024.622.864/0001-03  037.745.621/0001-04 
}
inputCpnjCpf.addEventListener('input', () => {
  formatarDocumento(inputCpnjCpf);
});


function SelectData() {
    const cnpj = document.getElementById('consulta-cnpj_cpf').value;
  
    if (!cnpj) {
      alert('Por favor, insira um CNPJ/CPF válido.');
      return;
    }
  // Limpando o CNPJ para remover os caracteres . / -
    const cnpjLimpo = cnpj.replace(/[./-]/g, '');
  
    const dbref = ref(db); // Referência direta à raiz do banco de dados

    get(child(dbref, cnpjLimpo)).then((snapshot) => {
     
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Assumindo que os elementos HTML são elementos <p>
            document.getElementById('cod').textContent = `Código Cliente: ${data.COD_CLIENTE}`|| "Não encontrado";
            document.getElementById('ficha').textContent =  `Ficha: ${data.FICHA} `|| "Não encontrado";
            document.getElementById('v1').textContent =  `V1: ${data.V1} ` || "Não encontrado";
            document.getElementById('v2').textContent =  `V2: ${data.V2} ` || "Não encontrado";

            // Mostrar os elementos (se estiverem ocultos)
            document.getElementById('cod').style.display = 'block';
            document.getElementById('ficha').style.display = 'block';
            document.getElementById('v1').style.display = 'block';
            document.getElementById('v2').style.display = 'block';

            //resultadoInput.style.margin = 'auto 0px';
            
            // Tempo de visualização
            setTimeout(() => {
              document.getElementById('cod').style.display = 'none';
              document.getElementById('ficha').style.display = 'none';
              document.getElementById('v1').style.display = 'none';
              document.getElementById('v2').style.display = 'none';
            document.getElementById('consulta-cnpj_cpf').value = '';
            }, 15000); 
          } else {
            alert("CNPJ/CPF não encontrado.");
            document.getElementById('consulta-cnpj_cpf').value = '';
          }
    }).catch((error) => {
      alert("Falha ao buscar dados: " + error.message);
      console.error(error);
    });
  }
  
  selBtn.addEventListener('click', SelectData);


// ... (restante do seu HTML)









