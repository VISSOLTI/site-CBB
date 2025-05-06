document.addEventListener('DOMContentLoaded', function() {
    // Encontra os elementos relevantes no HTML
    const openModalButtonSetor = document.getElementById('openModalButton_Analise');
    const modalSetor = document.getElementById('modal_Analise');
    const closeModalButtonCadastro = modalSetor.querySelector('.close-button_cadastro');
  
    // Função para abrir o modal
    function openModalSetor() {
      modalSetor.style.display = 'block';
    }
  
    // Função para fechar o modal
    function closeModalSetor() {
      modalSetor.style.display = 'none';
    }
  
    // Adiciona os listeners de evento para abrir e fechar o modal
    openModalButtonSetor.addEventListener('click', openModalSetor);
    closeModalButtonCadastro.addEventListener('click', closeModalSetor);
  
    // Fecha o modal se o usuário clicar fora da área do conteúdo do modal
    window.addEventListener('click', function(event) {
      if (event.target === modalSetor) {
        closeModalSetor();
      }
    });

});
  


