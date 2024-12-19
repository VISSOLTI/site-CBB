
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

  // Validação do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email.value)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
  }

  // Mostrar o modal
  const modal = document.getElementById('modalSucesso');
  modal.style.display = 'block'

  form_cadastro.reset();
};


btnClose.addEventListener('click', closeModal);
btnEnviar.addEventListener('click', Solicitar_cadastro);

