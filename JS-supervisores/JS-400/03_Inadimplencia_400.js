// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZTrc9zbak1TivgeOW0ALkUNM0MSc5TFU",
  authDomain: "sup-400-inadimplencia.firebaseapp.com",
  projectId: "sup-400-inadimplencia",
  storageBucket: "sup-400-inadimplencia.firebasestorage.app",
  messagingSenderId: "1068152433921",
  appId: "1:1068152433921:web:75946b3a30bf99b1353f00"
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


// Obtém o elemento select
const campoBuscaSelect = document.getElementById('campo-busca-select');
//const campoBuscaInput = document.getElementById('campo-busca');

// Adiciona um ouvinte de evento 'change' ao select
campoBuscaSelect.addEventListener('change', () => {
    // Define o valor do input com a opção selecionada
    campoBuscaInput.value = campoBuscaSelect.value;
});

function buscarDadosFirebase() {
    const dadosContainer = document.getElementById('dados-container');
    dadosContainer.innerHTML = '';

    const campoBusca = campoBuscaSelect.value.trim().toLowerCase(); // Obtém o valor do select
    const termoBusca = document.getElementById('termo-busca').value.trim().toLowerCase();

    if (campoBusca === "" || termoBusca === "") {
        dadosContainer.textContent = "Escolha uma  opção e preencha o valor.";
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
                                if (String(item[campo]).toLowerCase().includes(termoBusca)) {
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
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';

            // Cria o cabeçalho da tabela
            const headerRow = table.insertRow();
            const colunas = dadosFiltrados.length > 0 ? Object.keys(dadosFiltrados[0]).filter(coluna => coluna !== 'id') : []; // Verifica se dadosFiltrados não está vazio

            // Define a ordem desejada das colunas
            const ordemColunas = [
                "Super", "Vend", "Cód_Cliente", "Descr_Cliente","CNPJ_CPF", "Cidade", "Grupo_Análise", "NF_CBB", "Data_Emissão", "Valor_Original", "Vencimento", "Valor_Atualizado", "Status_Cobrança", "Produto", "PF_PJ", 
"Ficha_Cadastro"
 ];

            // Itera sobre a ordem desejada
            ordemColunas.forEach(coluna => {
                // Verifica se a coluna existe nos dados filtrados
                if (colunas.includes(coluna)) {
                    const headerCell = document.createElement('th');
                    headerCell.textContent = coluna;
                    headerCell.style.color = '#f09102';
                    headerCell.style.border = '1px solid #f09102';
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

// Insere os campos de busca antes do botão
const botaoBuscar = document.getElementById('buscar-dados');
botaoBuscar.parentNode.insertBefore(termoBuscaInput, botaoBuscar);
botaoBuscar.parentNode.insertBefore(campoBuscaInput, botaoBuscar);