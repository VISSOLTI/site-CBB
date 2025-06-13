// Configuração do Firebase
const firebaseConfig = {
     apiKey: "AIzaSyBVqA_UM_Y8IWFOjQH-9cz0LjosiYBivRs",
    authDomain: "nf-consulta.firebaseapp.com",
    projectId: "nf-consulta",
    storageBucket: "nf-consulta.firebasestorage.app",
    messagingSenderId: "641589548984",
    appId: "1:641589548984:web:29365b3784a7a61199614d"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Função para exibir o loading
function exibirLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;

    loading.innerHTML = '<img src="../../CSS-Supervisor/loading.gif" alt="Loading...">'; // Adiciona o GIF
    document.body.appendChild(loading);
}

// Função para remover o loading
function removerLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}

// Obtém o elemento select e o input (certifique-se de que 'campoBuscaInput' está definido no seu HTML)
const campoBuscaSelect = document.getElementById('campo-busca-select');
const termoBuscaInput = document.getElementById('termo-busca'); // Assumi que este era o 'campoBuscaInput' que estava comentado.

// Adiciona um ouvinte de evento 'change' ao select
campoBuscaSelect.addEventListener('change', () => {
    // Você não precisa mais dessa linha se o termo de busca for digitado em um input separado.
    // campoBuscaInput.value = campoBuscaSelect.value;
});

function buscarDadosFirebase() {
    const dadosContainer = document.getElementById('dados-container');
    dadosContainer.innerHTML = '';

    const campoBusca = campoBuscaSelect.value.trim().toLowerCase(); // Obtém o valor do select (o campo a ser pesquisado)
    const termoBusca = termoBuscaInput.value.trim().toLowerCase(); // Obtém o valor do input (o termo de busca)

    if (campoBusca === "" || termoBusca === "") {
        dadosContainer.textContent = "Escolha uma opção e preencha o valor.";
        dadosContainer.style.color = '#f09102';
        return;
    }

    exibirLoading();
    const dadosRef = db.ref();

    dadosRef.once('value', (snapshot) => {
        removerLoading();
        const dados = snapshot.val();

        if (dados) {
            const dadosFiltrados = Object.entries(dados)
                .filter(([key, item]) => {
                    // Verifica se o item é um objeto antes de acessar suas propriedades
                    if (typeof item === 'object' && item !== null) {
                        for (const campo in item) {
                            if (item.hasOwnProperty(campo) && campo.toLowerCase() === campoBusca) {
                                // AQUI ESTÁ A CORREÇÃO: Comparação de igualdade exata (===)
                                if (String(item[campo]).toLowerCase() === termoBusca) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                })
                .map(([key, item]) => ({ ...item, id: key }));

            if (dadosFiltrados.length === 0) {
                dadosContainer.textContent = "Nenhum resultado encontrado.";
                dadosContainer.style.color = '#f09102';
                return;
            }

            // Cria a tabela
            const table = document.createElement('table');
            table.style.width = '50%';
            table.style.borderCollapse = 'collapse';

            // Cria o cabeçalho da tabela
            const headerRow = table.insertRow();
            const colunas = dadosFiltrados.length > 0 ? Object.keys(dadosFiltrados[0]).filter(coluna => coluna !== 'id') : []; // Verifica se dadosFiltrados não está vazio

            // Define a ordem desejada das colunas
            const ordemColunas = [
                "NF", "Faturamento", "Num Rom"];

            // Itera sobre a ordem desejada
            ordemColunas.forEach(coluna => {
                // Verifica se a coluna existe nos dados filtrados
                if (colunas.includes(coluna)) {
                    const headerCell = document.createElement('th');
                    headerCell.textContent = coluna;
                    headerCell.style.color = '#f09102';
                    headerCell.style.border = '1px solidrgb(237, 234, 230)';
                    headerCell.style.padding = '1.5px';
                    headerRow.appendChild(headerCell);
                }
            });

            // Adiciona os dados à tabela
            dadosFiltrados.forEach(item => {
                const row = table.insertRow();
                // Itera sobre a ordem desejada novamente para garantir a ordem correta dos dados
                ordemColunas.forEach(coluna => {
                    if (colunas.includes(coluna)) {
                        const cell = row.insertCell();
                        cell.textContent = item[coluna] || '-'; // Exibe '-' se o campo for vazio
                        cell.style.border = '1px solid #f09102';
                        cell.style.padding = '1.5px';
                        cell.style.color = '#ffff'; // Adiciona cor ao texto das células
                        row.style.backgroundColor = '#2c2c2c'; // Adiciona cor de fundo à linha
                        cell.style.fontWeight = 'bold'; // Adiciona negrito ao texto das células
                        row.style.border = '1px solid #f09102';
                        row.style.borderRadius = '5px'; // Adiciona borda arredondada às linhas
                        row.style.marginBottom = '5px'; // Adiciona espaçamento entre as linhas

                        cell.style.border = '1px solid #f09102';
                        cell.style.padding = '1.5px';
                    }
                });
            });

            // Adiciona a tabela ao contêiner
            dadosContainer.appendChild(table);

        } else {
            dadosContainer.textContent = "Dados não encontrados.";
            dadosContainer.style.color = '#f09102';
        }
    }, (error) => {
        removerLoading();
        dadosContainer.textContent = "Erro ao buscar dados: " + error.message;
        dadosContainer.style.color = '#f09102';
        console.error("Erro Firebase:", error);
    });
}

// Evento de clique no botão de busca
document.getElementById('buscar-dados').addEventListener('click', buscarDadosFirebase);

// Insere os campos de busca antes do botão (garantindo que 'termoBuscaInput' esteja definido no seu HTML)
const botaoBuscar = document.getElementById('buscar-dados');
// Assumi que você tem um elemento com id 'termo-busca' para o input de texto.
// Se 'campoBuscaInput' era para ser o input onde o usuário digita, renomeie-o ou use 'termoBuscaInput'.
// Se 'campoBuscaInput' não existe no HTML, essas linhas darão erro.
// botaoBuscar.parentNode.insertBefore(termoBuscaInput, botaoBuscar);
// botaoBuscar.parentNode.insertBefore(campoBuscaInput, botaoBuscar); // Esta linha provavelmente é redundante se 'campoBuscaSelect' já existe.