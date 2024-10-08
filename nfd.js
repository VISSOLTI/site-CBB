function showForm(formId) {
    var forms = document.querySelectorAll('.container.section');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    var formToShow = document.getElementById(formId);
    if (formToShow) {
        formToShow.style.display = 'block';
    } else {
        console.error("Formulário não encontrado: " + formId);
    }
}


// Lógica para exibir o formulário de avaliação
function showReviewForm() {
    document.getElementById("reviewForm").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("reviewModal").style.display = "block";
}

 //Lógica para fechar o modal
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("reviewModal").style.display = "none";
}

// Lógica para enviar o formulário
function submitReview() {
    //Adicione aqui a lógica para processar e exibir o formulário(por exemplo, armazenar em um banco de dados)
    closeModal(); // Fecha o modal após o envio
}

function formatInput(value) {
  let result = '';
  let count = 0;
  for (let i = 0; i < value.length; i++) {
    if (!isNaN(value[i])) {
      result += value[i];
      count++;
      if (count % 2 === 0 && count < value.length) result += ',';
      if (count % 3 === 0 && count < value.length) result += '/';
      if (count % 4 === 0 && count < value.length) result += '-';
    } else {
      result += value[i];
    }
  }
  document.getElementById('input').value = result;
}


// Função para formatar o CNPJ enquanto o usuário digita
 function formatarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  return cnpj;  
}

// Adiciona um listener de evento para o input do CNPJ
document.getElementById('cnpj').addEventListener('input', function() {
  var cnpj = this.value;
  this.value = formatarCNPJ(cnpj);
});

// Impede a entrada de caracteres não numéricos
 document.getElementById('cnpj').addEventListener('keypress', function(e) {
  var keyCode = e.which || e.keyCode;
  var keyValue = String.fromCharCode(keyCode);
  var pattern = /[0-9]/;
  if (!pattern.test(keyValue)) {
      e.preventDefault();
  }
});

function permitirApenasNumeros(input) {
  input.value = input.value.replace(/\D/g, '');
}

// Adiciona um listener de evento para os inputs das NFes
document.getElementById('NFeCBB').addEventListener('input', function() {
  permitirApenasNumeros(this);
});

document.getElementById('NFeDevolucao').addEventListener('input', function() {
  permitirApenasNumeros(this);
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
document.getElementById('Telefone').addEventListener('input', function() {
  var telefone = this.value;
  this.value = formatarTelefone(telefone);
});

// Impede a entrada de caracteres não numéricos
//document.getElementById('Telefone').addEventListener('keypress', function(e) {
//  var keyCode = e.which || e.keyCode;
//  var keyValue = String.fromCharCode(keyCode);
//  var pattern = /[0-9]/;
//  if (!pattern.test(keyValue)) {
//      e.preventDefault();
//  }
//});

// Função para formatar o valor da NFD enquanto o usuário digita
function formatarValor(valor) {
  // Remove todos os caracteres não numéricos
  valor = valor.replace(/\D/g, '');

  // Adiciona o "R$" ao início do valor
  valor = "R$ " + valor;

  // Formata o valor com a vírgula para separar os centavos dos reais
  valor = valor.replace(/(\d{1,})(\d{2})$/, "$1,$2");

  return valor;
}

// Adiciona um listener de evento para o input do valor
document.getElementById('Valor').addEventListener('input', function() {
  var valor = this.value;
  this.value = formatarValor(valor);
});

// Impede a entrada de caracteres não numéricos
document.getElementById('Valor').addEventListener('keypress', function(e) {
  var keyCode = e.which || e.keyCode;
  var keyValue = String.fromCharCode(keyCode);
  var pattern = /[0-9]/;
  if (!pattern.test(keyValue)) {
      e.preventDefault();
  }
});


  // Função para validar o formulário
  function validarFormulario(event) {
    event.preventDefault(); // Impede o envio automático do formulário
  
    // Obtém os valores dos campos e a quantidade de arquivos selecionados
    var NFeCBB = document.getElementById('NFeCBB').value;
    var NFeDevolucao = document.getElementById('NFeDevolucao').value;
    var CNPJ = document.getElementById('cnpj').value;
    var Email = document.getElementById('Email').value;
    
    var NFeDev = document.getElementById('NFeDev').files.length;
    var Canhoto = document.getElementById('Canhoto').files.length;
    var Boleto = document.getElementById('Boleto').files.length;
  
    // Verifica se todos os campos estão preenchidos e se os arquivos foram selecionados ---  !!! até email
    if (!NFeCBB || !NFeDevolucao || !CNPJ || !Email ) {
      alert('Todos os campos e arquivos PDF são obrigatórios.');
      return false;
    }
  
    // Se tudo estiver correto, permite o envio do formulário
    document.getElementById('form').submit();
  }
  
  // Adiciona o evento de 'submit' ao formulário
  document.getElementById('form').addEventListener('submit', validarFormulario);

 
// Quebrar nome dos arquivos anexados
function updateFileNames(input, id) {
  const fileNamesDiv = document.getElementById(`${id}FileNames`);
  const deleteButton = document.getElementById(`${id}DeleteButton`);
  const files = Array.from(input.files);
  
  let fileNames;
  
  if (files.length === 1) {
    fileNames = files[0].name.length > 20 ? files[0].name.slice(0, 20) + '...' : files[0].name;
  } else {
    const firstFileName = files[0].name.length > 20 ? files[0].name.slice(0, 20) + '...' : files[0].name;
    fileNames = `${firstFileName} (+${files.length - 1})`;
  }

  fileNamesDiv.textContent = fileNames || 'Nenhum arquivo anexado';
  deleteButton.style.display = files.length ? 'inline' : 'none';
}

function clearFiles(id) {
  const input = document.getElementById(id);
  const fileNamesDiv = document.getElementById(`${id}FileNames`);
  const deleteButton = document.getElementById(`${id}DeleteButton`);
  // Limpa os arquivos selecionados
  input.value = '';
  // Atualiza a exibição dos nomes dos arquivos
  fileNamesDiv.textContent = 'Nenhum arquivo anexado';
  // Oculta o botão de exclusão de arquivo
  deleteButton.style.display = 'none';
}





