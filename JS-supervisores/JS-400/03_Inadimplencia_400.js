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

function buscarDadosFirebase() {
    const dadosContainer = document.getElementById('dados-container');
    dadosContainer.innerHTML = '';

     // Exibe o loading antes de buscar os dados
     exibirLoading();
    
    const dadosRef = db.ref('400');
  
    dadosRef.once('value', (snapshot) => {
      // Remove o loading após receber os dados (com sucesso ou erro)
      removerLoading();
      
      const dados = snapshot.val();
      if (dados) {
        const dadosAgrupados = {};
  
        for (const key in dados) {
          const item = dados[key];
          if (typeof item === 'object' && item !== null) {
            for (const letra in item) {
              if (!dadosAgrupados[letra]) {
                dadosAgrupados[letra] = {};
              }
              dadosAgrupados[letra][key] = item[letra];
            }
          }
        }
  
        // Cria os filtros (dropdowns)
        const filtrosContainer = document.getElementById('filtros-container');
        filtrosContainer.style.border = "2px solid #f09102"; // Adiciona borda ao container
        filtrosContainer.style.borderRadius = "5px"
        filtrosContainer.style.padding = "10px 20px"

        const letras = Object.keys(dadosAgrupados).sort(); // Ordena as letras
  
        // Função para criar os dropdowns de filtro
        function criarFiltros(letra) {
          const filtroDiv = document.createElement('div');
          filtroDiv.classList.add('filtro');

          const label = document.createElement('label');
          label.textContent = `${letra}:`;
          const select = document.createElement('select');
          select.id = `filtro-${letra}`;
          const opcaoPadrao = document.createElement('option');
          opcaoPadrao.value = '';
          opcaoPadrao.textContent = 'opções';
          select.appendChild(opcaoPadrao);
  
          const valoresLetra = [...new Set(Object.values(dadosAgrupados[letra]))]; // Valores únicos

          // Ordena os valores
          valoresLetra.sort((a, b) => {
            const aNum = Number(a);
            const bNum = Number(b);

            if (!isNaN(aNum) && !isNaN(bNum)) {
              // Se ambos forem números, ordena numericamente
              return aNum - bNum;
            } else {
              // Se não forem números, ordena alfabeticamente
              return a.localeCompare(b);
            }
          });

          for (const valor of valoresLetra) {
            const opcao = document.createElement('option');
            opcao.value = valor;
            opcao.textContent = valor;
            select.appendChild(opcao);
          }
  
          filtroDiv.appendChild(label);
          filtroDiv.appendChild(select);
          return filtroDiv;
        }
  
        // Adiciona os filtros ao container
        letras.forEach(letra => {
          const filtro = criarFiltros(letra);
          filtrosContainer.appendChild(filtro);
        });
  
        // Botão "Filtrar"
        const botaoFiltrar = document.createElement('button');
        botaoFiltrar.id = 'filtrar';
        botaoFiltrar.textContent = 'Filtrar';
        botaoFiltrar.addEventListener('click', () => {
           // Limpa os dados exibidos
          dadosContainer.innerHTML = '';

          const filtrosSelecionados = {};
          letras.forEach(letra => {
            const filtro = document.getElementById(`filtro-${letra}`);
            filtrosSelecionados[letra] = filtro.value;
          });
  
          // Filtra os dados com base nos filtros selecionados
          const dadosFiltrados = Object.entries(dados)
            .filter(([key, item]) => {
              let exibir = true;
              for (const letra in filtrosSelecionados) {
                if (filtrosSelecionados[letra] !== '' && item[letra] !== filtrosSelecionados[letra]) {
                  exibir = false;
                  break;
                }
              }
              return exibir;
            })
            .map(([key, item]) => ({ ...item, id: key })); // Adiciona o ID do item
  
         // Exibe os dados filtrados em formato de tabela
         dadosContainer.innerHTML = '';
         const table = document.createElement('table');
         table.style.width = '10%'; // Opcional: define a largura da tabela
         table.style.borderCollapse = 'collapse'; // Opcional: remove espaçamento entre as células


          // **Limpa os filtros após a filtragem**
        letras.forEach(letra => {
          const filtro = document.getElementById(`filtro-${letra}`);
          filtro.value = ''; // Define a opção padrão como selecionada
      });

         // Cria o cabeçalho da tabela
         const headerRow = table.insertRow();
         const colunas = Object.keys(dadosAgrupados); // Obtém as colunas dos dados
         colunas.forEach(coluna => {
           const headerCell = document.createElement('th'); // Cria células de cabeçalho <th>
           headerCell.textContent = coluna;
           headerCell.style.color = ' #f09102'; // Altere 'red' para a cor desejada
           headerCell.style.border = '1px solid #f09102'; // Opcional: adiciona borda às células
           headerCell.style.padding = '1.5px'; // Opcional: adiciona padding às células
           headerRow.appendChild(headerCell);
         });

         dadosFiltrados.forEach(item => {
           const row = table.insertRow();
           colunas.forEach(coluna => {
             const cell = row.insertCell();
             cell.textContent = item[coluna] || '-'; // Exibe o valor ou "-" se não existir
             cell.style.border = '1px solid #f09102'; // Opcional: adiciona borda às células
             cell.style.padding = '1.5px'; // Opcional: adiciona padding às células
           });
         });

         dadosContainer.appendChild(table);
       });

     filtrosContainer.appendChild(botaoFiltrar);
      } else {
        dadosContainer.textContent = "Nenhum dado encontrado.";
      }
    }, (error) => {
      // ... (Tratamento de erros)
    });
  }
  
  window.onload = buscarDadosFirebase;