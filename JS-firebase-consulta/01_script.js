 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAwv5pvfbbL3wg9IXXliqOFIYU1IBRR3Jw",
   authDomain: "teste-bd-6bcda.firebaseapp.com",
   databaseURL: "https://teste-bd-6bcda-default-rtdb.firebaseio.com",
   projectId: "teste-bd-6bcda",
   storageBucket: "teste-bd-6bcda.appspot.com",
   messagingSenderId: "148981031611",
   appId: "1:148981031611:web:e3305e87bac831ccf4ff9e"
 };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"

const db = getDatabase();

var selBtn = document.getElementById("Selbtn")
var inputCodigo = document.getElementById("codigo")


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
inputCodigo.addEventListener("input", function() {
    formatarCodigo(inputCodigo);
  });


function SelectData() {
    const cod = document.getElementById('codigo').value;
  
    if (!cod) {
      alert('Por favor, insira um Código válido.');
      return;
    }
  // Limpando o Código para remover os caracteres . / -
    const cod_limpo = cod.replace(/[-]/g, '');
  
    const dbref = ref(db); // Referência direta à raiz do banco de dados
    get(child(dbref, cod_limpo)).then((snapshot) => {

        if (snapshot.exists()) {
        const data = snapshot.val();
        const zeroData = data[0];
        let i = 1;
     

        const container = document.getElementById('container-teste');
        container.innerHTML = '';
    
        // Create the table
        const table = document.createElement('table');
        const tableHeader = document.createElement('tr');
        const tableBody = document.createElement('tbody');
    
        // Create table headers (you can customize the names = 45)
        const headers = ['Status','Lançamento','NF/NFD', 'Emissão', 'Vencimento', 'Valor Original', 'Valor Desconto', 'Valor Abatimento', 'Valor Líquido', 'Valor Atualizado', 'Aut.NFD', 'Produto', 'Protesto-2', 'Código Boleto', 'Código Barras', 'Vend', 'Supervisor', 'Obs Pagamento'];
        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header;
          tableHeader.appendChild(th); ///const level in data - const key of
        });
    
        // Adcionar a tabela
        for (const level in data) {
          if (data.hasOwnProperty(level)) {
            const levelData = data[level];
            const row = document.createElement('tr');
    
            // Add data to the row in the desired order
            // Adapt the key names to match your data
            let rowContent = '';
            for (const key of ['V','B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S' ]) {
              rowContent += `<td>${levelData[key] || ''}</td>`; // Add empty string for missing values
            }
            row.innerHTML = rowContent;
    
            tableBody.appendChild(row);
          }
        }
    
        table.appendChild(tableHeader);
        table.appendChild(tableBody);
        container.appendChild(table);


        for (const key in zeroData) {
            document.getElementById(`texto${i}`).textContent = zeroData[key] || "Não encontrado";
            i++;
        }
        } else {
        alert("Código não encontrado.");
        //document.getElementById('codigo').value = '';
    }
  })

}
  selBtn.addEventListener('click', SelectData);