
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpKbfqgFY9Erz4U8r1eP54a__IOIwsAXM",
  authDomain: "cbb-nfd.firebaseapp.com",
  databaseURL: "https://cbb-nfd-default-rtdb.firebaseio.com",
  projectId: "cbb-nfd",
  storageBucket: "cbb-nfd.appspot.com",
  messagingSenderId: "56790293937",
  appId: "1:56790293937:web:da7263e683be5aee2df190"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const db = getDatabase();


var numNFCBB = document.getElementById("NFeCBB")
var numNFDevolucao = document.getElementById("NFeDevolucao")
var cnpj = document.getElementById("cnpj")
var email_Cliente = document.getElementById("Email")
var valor = document.getElementById("Valor")
var telefone = document.getElementById("Telefone")

var Insbtn = document.getElementById("Insbtn")


function EnviarNFD(){
    // Verifica se todos campos foram preenchidos!
    if (cnpj.value === '' || numNFCBB.value === '' || numNFDevolucao.value === '' || email_Cliente.value === '' || valor.value === '' || telefone.value === '') {
        alert("Preencha todos os campos!");
        return;
    }
    set(ref(db, "NFD/"+ telefone.value), {
        CNPJ: cnpj.value,
        Numero_NF_CBB: numNFCBB.value,
        Numero_NF_Devolucao: numNFDevolucao.value,
        Email_CLiente: email_Cliente.value,
        Valor: valor.value,
    }).then(() => {
       alert("NFD enviada com sucesso") 
        cnpj.value = "",
        numNFCBB.value = "",
        numNFDevolucao.value = "",
        email_Cliente.value = "",
        valor.value = ""
        telefone.value = ""
    }).catch((error)=> {
        alert("falha, error"+error)
    })
}

Insbtn.addEventListener('click', EnviarNFD)