
const openModalButton = document.getElementById('openModalButton');
const openModalButton_Setor = document.getElementById('openModalButton_Setor');
const modal = document.getElementById('modal');
const modal_Setor = document.getElementById('modal_Setor');

const openModalButton_cadastro = document.getElementById('openModalButton_cadastro');
const modal_cadastro = document.getElementById('modal_cadastro');
const closeButton = document.querySelector('.close-button');
const closeButton_cadastro = document.querySelector('.close-button_cadastro');
const modalForm = document.getElementById('modalForm');
const modalForm_cadastro = document.getElementById('modalForm_cadastro');


// Adiciona um listener de evento para o input do telefone
document.getElementById('tel_solicitante').addEventListener('input', function() {
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


function formatarInput(input) {
  // Remove todos os caracteres que não sejam números
  let valor = input.value.replace(/\D/g, '');

  // Formata o valor com o hífen após os 4 primeiros dígitos
  valor = valor.replace(/(\d{4})(\d)/, '$1-$2');

  // Limita o número máximo de dígitos para 9
  valor = valor.slice(0, 9);

  // Atualiza o valor do input
  input.value = valor;
}



// Open Modal
openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});
openModalButton_Setor.addEventListener('click', () => {
  modal_Setor.style.display = 'block';
});



// Open Modal
openModalButton_cadastro.addEventListener('click', () => {
  modal_cadastro.style.display = 'block';
});

// Close Modal
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
closeButton_cadastro.addEventListener('click', () => {
  modal_cadastro.style.display = 'none';
});

// Close Modal on Outside Click (Optional)
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});



