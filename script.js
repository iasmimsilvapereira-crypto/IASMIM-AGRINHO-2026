// Seleciona os botões da página
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnContraste = document.getElementById('btn-contraste');
const btnOuvir = document.getElementById('btn-ouvir');
const btnParar = document.getElementById('btn-parar');

// VARIÁVEIS DE CONTROLE
let tamanhoFonte = 100; // Começa em 100%
const sinteseVoz = window.speechSynthesis;
let leituraAtual = null;

// 1. FUNÇÃO AUMENTAR FONTE
btnAumentar.addEventListener('click', () => {
    tamanhoFonte += 10;
    document.body.style.fontSize = tamanhoFonte + '%';
});

// 2. FUNÇÃO DIMINUIR FONTE
btnDiminuir.addEventListener('click', () => {
    if (tamanhoFonte > 70) { // Limite mínimo para não sumir o texto
        tamanhoFonte -= 10;
        document.body.style.fontSize = tamanhoFonte + '%';
    }
});

// 3. FUNÇÃO MODO CLARO / ESCURO (CONTRASTE)
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
});

// 4. FUNÇÃO OUVIR TEXTO
btnOuvir.addEventListener('click', () => {
    // Para qualquer leitura que já estiver rolando antes
    sinteseVoz.cancel(); 
    
    // Pega todo o texto do conteúdo principal
    const textoParaLer = document.getElementById('conteudo-principal').innerText;
    
    leituraAtual = new SpeechSynthesisUtterance(textoParaLer);
    leituraAtual.lang = 'pt-BR'; // Define o idioma para português
    
    sinteseVoz.speak(leituraAtual);
});

// 5. FUNÇÃO PARAR LEITURA
btnParar.addEventListener('click', () => {
    sinteseVoz.cancel();
});

    // ==========================================================================
    // 4. PROCESSAMENTO DOS FORMULÁRIOS (EVENTOS E INTERATIVIDADE)
    // ==========================================================================

    // Formulário de Inscrição do Seminário
    const formSeminario = document.getElementById("form-seminario");
    formSeminario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Impede o recarregamento padrão da página

        // Captura individualizada dos dados preenchidos pelo usuário
        const dadosInscricao = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            pais: document.getElementById("pais").value
        };

        // Simulação de sucesso da inscrição
        alert(`Inscrição confirmada com sucesso, ${dadosInscricao.nome}!\nOs detalhes do seminário foram enviados para: ${dadosInscricao.email}`);
        
        // Limpa todos os campos do formulário de inscrição
        formSeminario.reset();
    });

    // Formulário de Comentários / Área de Interação
    const formComentario = document.getElementById("form-comentario");
    const containerListaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Impede o recarregamento padrão da página

        const inputComentario = document.getElementById("comentario");
        const textoDoComentario = inputComentario.value.trim();

        if (textoDoComentario !== "") {
            // Cria dinamicamente a estrutura visual para o novo comentário
            const novoComentarioCard = document.createElement("div");
            novoComentarioCard.classList.add