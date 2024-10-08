// Get references to the buttons and containers
const btnCNPJ = document.getElementById('btnCNPJ');
const btnCliente = document.getElementById('btnCliente');
const cnpjContent = document.getElementById('cnpjContent');
const clienteContent = document.getElementById('clienteContent');
const firstContainer = document.querySelector('.container-consulta');


// Create "X" buttons and append them after the respective h2 elements
const cnpjXButton = document.getElementById('close');

cnpjXButton.addEventListener('click', () => {
  cnpjContent.style.display = 'none';
  firstContainer.style.display = 'block';
  document.getElementById('consulta-cnpj_cpf').value = '';
   // Fechar os elementos
   document.getElementById('cod').style.display = 'none';
   document.getElementById('ficha').style.display = 'none';
   document.getElementById('v1').style.display = 'none';
   document.getElementById('v2').style.display = 'none';
});
cnpjContent.querySelector('h2').appendChild(cnpjXButton);

const clienteXButton = document.getElementById('close2');
clienteXButton.addEventListener('click', () => {
  clienteContent.style.display = 'none';
  firstContainer.style.display = 'block';
  // Fechar os elementos
  document.getElementById('consulta-cod_cli').value = '';
  document.getElementById('ficha_cli').style.display = 'none';
  document.getElementById('v1_cli').style.display = 'none';
  document.getElementById('v2_cli').style.display = 'none';
});
clienteContent.querySelector('h2').appendChild(clienteXButton);


// Add event listeners to the original buttons
btnCNPJ.addEventListener('click', () => {
  firstContainer.style.display = 'none';
  cnpjContent.style.display = 'block';
  clienteContent.style.display = 'none';
});
btnCliente.addEventListener('click', () => {
  firstContainer.style.display = 'none';
  clienteContent.style.display = 'block';
  cnpjContent.style.display = 'none';
});






