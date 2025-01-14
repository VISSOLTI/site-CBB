// Obtendo os elementos do HTML
const modal1 = document.getElementById('modal1_termo');
const modal2 = document.getElementById('modal_cadastro');
const btnAbrirModal1 = document.getElementById('abrirModal1');
const btnAvancar1 = document.getElementById('avancar1');
const btnsFechar = document.getElementsByClassName("close-button_cadastro");

// Função para abrir um modal
function abrirModal(modal) {
    modal.style.display = "block"; 
}

// Função para fechar um modal
function fecharModal(modal) {
    modal.style.display = "none";
}

// Quando o usuário clica em um dos botões de fechar, fecha o modal
for (let i = 0; i < btnsFechar.length; i++) {
    btnsFechar[i].onclick = function() {
        fecharModal(this.parentElement.parentElement);
    }
}

// Ao clicar em "Abrir Primeiro Modal", abre o primeiro modal
btnAbrirModal1.onclick = function() {
    abrirModal(modal1);
}

// Ao clicar em "Avançar" no primeiro modal, fecha o primeiro e abre o segundo
btnAvancar1.onclick = function() {
    fecharModal(modal1);
    abrirModal(modal2);
}

const btnDeclinar1 = document.getElementById('declinar1');

btnDeclinar1.onclick = function() {
    fecharModal(modal1);
    // Aqui você pode adicionar código para voltar ao estado inicial da página, 
    // como por exemplo, redefinir variáveis, esconder outros elementos, etc.
    // Por exemplo, se você tiver um botão "Abrir Primeiro Modal" que inicialmente
    // mostra o primeiro modal, você poderia torná-lo visível novamente:
    btnAbrirModal1.style.display = 'block';
};

const btnEnviar = document.getElementById('enviar');

btnEnviar.onclick = function() {
    // Aqui você define a ação que será executada ao clicar em "Enviar"
    // Por exemplo:
    // - Enviar dados para um servidor
    // - Realizar alguma ação na página
    // - Abrir outro modal
    // ...

    // Exemplo simples: Exibir uma mensagem de sucesso
    alert('Dados enviados com sucesso!');

    // Fechar o modal
    fecharModal(modal2);
};








/////////