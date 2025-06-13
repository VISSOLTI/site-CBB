// Configurações do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBYYp97Ao7-_DxxGmTu7NPRDC2FZdJFLDg",
    authDomain: "cbb-cadastro.firebaseapp.com",
    databaseURL: "https://cbb-cadastro-default-rtdb.firebaseio.com",
    projectId: "cbb-cadastro",
    storageBucket: "cbb-cadastro.firebasestorage.app",
    messagingSenderId: "826130353391",
    appId: "1:826130353391:web:3d1ca11f63fc22afc8df1a"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Obtém uma referência ao serviço de armazenamento
const storage = firebase.storage();

// --- Função para lidar com o download de PDFs ---
async function handlePdfDownload(pdfFileName, messageElement) {
    messageElement.textContent = 'Carregando PDF';
    messageElement.style.color = '#4BC9F3'; // Cor azul para status

    try {
        const pdfRef = storage.ref(pdfFileName);
        const downloadUrl = await pdfRef.getDownloadURL();

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.target = '_blank';
        a.download = pdfFileName.split('/').pop();

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        messageElement.textContent = 'Download iniciado!';
        messageElement.style.color = '#5cb85c'; // Verde para sucesso

    } catch (error) {
        console.error("Erro ao baixar o PDF:", error);

        messageElement.textContent = 'Erro ao baixar o PDF. Por favor, tente novamente.';
        messageElement.style.color = '#d9534f'; // Vermelho para erro

        if (error.code === 'storage/object-not-found') {
            messageElement.textContent = 'O arquivo PDF não foi encontrado. Verifique se o nome do arquivo está correto no Firebase Storage.';
        } else if (error.code === 'storage/unauthorized') {
            messageElement.textContent = 'Você não tem permissão para acessar este arquivo. Por favor, verifique as regras de segurança do Firebase Storage.';
        } else if (error.code === 'storage/canceled') {
            messageElement.textContent = 'O download foi cancelado pelo usuário ou por um erro inesperado.';
        }
    }
}

// --- Configuração para o primeiro PDF ---
const pdfFileName1 = 'FICHA CADASTRO CBB/ficha cbb.pdf';
const downloadPdfButton1 = document.getElementById('downloadPdfButton');
const messageElement1 = document.getElementById('message');

if (downloadPdfButton1 && messageElement1) {
    downloadPdfButton1.addEventListener('click', () => {
        handlePdfDownload(pdfFileName1, messageElement1);
    });
} else {
    console.warn("Elemento 'downloadPdfButton' ou 'message' não encontrado para o primeiro PDF.");
}

// --- Configuração para o segundo PDF ---
// Altere 'NOVA PASTA/NOVO_ARQUIVO.pdf' para o caminho real do seu novo arquivo PDF no Firebase Storage
const pdfFileName2 = 'FICHA CADASTRO JULIA COSMETICO/ficha julia.pdf'; // << Altere este caminho
const downloadPdfButton2 = document.getElementById('downloadPdfButton2'); // Novo ID para o segundo botão
const messageElement2 = document.getElementById('message2'); // Novo ID para a segunda mensagem

if (downloadPdfButton2 && messageElement2) {
    downloadPdfButton2.addEventListener('click', () => {
        handlePdfDownload(pdfFileName2, messageElement2);
    });
} else {
    console.warn("Elemento 'downloadPdfButton2' ou 'message2' não encontrado para o segundo PDF.");
}