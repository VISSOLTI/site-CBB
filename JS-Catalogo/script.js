document.addEventListener('DOMContentLoaded', function() {
    const capasIniciais = document.querySelectorAll('.revista-inicial');
    const revistasContainer = document.querySelectorAll('.revista-container');
    const navegacao = document.getElementById('navegacao');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');
    const btnVoltarCapas = document.getElementById('btnVoltarCapa');
    const somPassarFolha = document.getElementById('somPassarFolha');
    let revistaAtiva = null;
    let paginaAtual = 0;

    function mostrarPagina(indice) {
        if (revistaAtiva) {
            const paginas = revistaAtiva.querySelectorAll('.pagina');
            paginas.forEach((pagina, i) => {
                pagina.style.display = i === indice ? 'block' : 'none';
            });
            btnAnterior.disabled = indice === 0;
            btnProximo.disabled = indice === paginas.length - 1;
        }
    }

    function tocarSomPassarFolha() {
        if (somPassarFolha) {
            somPassarFolha.currentTime = 0;
            somPassarFolha.play();
        }
    }

    capasIniciais.forEach(capaInicial => {
        capaInicial.addEventListener('click', function(event) {
            const revistaIndex = this.dataset.revista;
            const todosCapasContainers = document.querySelectorAll('.capas-container');
            todosCapasContainers.forEach(container => container.style.display = 'none');
            revistasContainer.forEach(container => container.style.display = 'none');
            revistaAtiva = document.getElementById(`revista-${revistaIndex}`);
            if (revistaAtiva) {
                revistaAtiva.style.display = 'flex';
                navegacao.style.display = 'flex';
                paginaAtual = 0;
                mostrarPagina(paginaAtual);

                // Adição para centralizar a revista
                revistaAtiva.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        });
    });

    btnProximo.addEventListener('click', function() {
        if (revistaAtiva) {
            const paginas = revistaAtiva.querySelectorAll('.pagina');
            if (paginaAtual < paginas.length - 1) {
                tocarSomPassarFolha();
                paginaAtual++;
                mostrarPagina(paginaAtual);

                // Adição para manter a página atualizada centralizada
                const paginaAtivaElement = revistaAtiva.querySelector(`.pagina:nth-child(${paginaAtual + 1})`);
                if (paginaAtivaElement) {
                    paginaAtivaElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                }
            }
        }
    });

    btnAnterior.addEventListener('click', function() {
        if (revistaAtiva && paginaAtual > 0) {
            tocarSomPassarFolha();
            paginaAtual--;
            mostrarPagina(paginaAtual);

            // Adição para manter a página atualizada centralizada
            const paginaAtivaElement = revistaAtiva.querySelector(`.pagina:nth-child(${paginaAtual + 1})`);
            if (paginaAtivaElement) {
                paginaAtivaElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        }
    });

    btnVoltarCapas.addEventListener('click', function() {
        if (revistaAtiva) {
            revistaAtiva.style.display = 'none';
            navegacao.style.display = 'none';
            const todosCapasContainers = document.querySelectorAll('.capas-container');
            todosCapasContainers.forEach(container => container.style.display = 'flex');
            revistaAtiva = null;
            paginaAtual = 0;

            // Adição para centralizar a seção de capas ao voltar
            if (todosCapasContainers.length > 0) {
                todosCapasContainers[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        }
    });

    // Inicialmente, exibe apenas as capas iniciais
    revistasContainer.forEach(container => container.style.display = 'none');
    const todosCapasContainers = document.querySelectorAll('.capas-container');
    todosCapasContainers.forEach(container => container.style.display = 'flex');
});