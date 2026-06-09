 * ARQUIVO: script.js
 * FUNÇÃO: Controlar a interatividade, acessibilidade e envio de dados da página.
 * ESPECIFICAÇÃO: Feito sem bibliotecas, usando JavaScript moderno e assíncrono.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. GERENCIAMENTO DO ACORDEÃO (SEÇÕES EXPANSÍVEIS)
    // ==========================================================================
    const botoesAcordeao = document.querySelectorAll(".acordeao-cabecalho");

    botoesAcordeao.forEach(botao => {
        botao.addEventListener("click", () => {
            const itemAtual = botao.parentElement;
            const icone = botao.querySelector(".icone-status");
            
            // Verifica se o item clicado já está aberto
            const estaAtivo = itemAtual.classList.contains("ativo");
            
            // Fecha todos os itens abertos primeiro (comportamento de colapso mútuo)
            document.querySelectorAll(".acordeao-item").forEach(item => {
                item.classList.remove("ativo");
                const itemBotao = item.querySelector(".acordeao-cabecalho");
                if (itemBotao) itemBotao.setAttribute("aria-expanded", "false");
                const itemIcone = item.querySelector(".icone-status");
                if (itemIcone) itemIcone.textContent = "+";
            });

            // Se o item não estava ativo, ele abre agora
            if (!estaAtivo) {
                itemAtual.classList.add("ativo");
                botao.setAttribute("aria-expanded", "true");
                icone.textContent = "−";
            }
        });
    });

    // ==========================================================================
    // 2. CONTROLE DE ACESSIBILIDADE VISUAL (FONTE E TEMA ESCURO)
    // ==========================================================================
    let tamanhoFonteAtual = 100; // Representa 100% do valor base configurado no CSS
    const elementoHtml = document.documentElement;

    // Aumentar o tamanho do texto globalmente
    document.getElementById("btn-aumentar").addEventListener("click", () => {
        if (tamanhoFonteAtual < 140) { // Limite máximo seguro para evitar quebras de layout
            tamanhoFonteAtual += 10;
            elementoHtml.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // Diminuir o tamanho do texto globalmente
    document.getElementById("btn-diminuir").addEventListener("click", () => {
        if (tamanhoFonteAtual > 80) { // Limite mínimo seguro para manter legibilidade
            tamanhoFonteAtual -= 10;
            elementoHtml.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // Alternar entre Modo Escuro e Modo Claro
    document.getElementById("btn-tema").addEventListener("click", () => {
        document.body.classList.toggle("modo-escuro");
    });

    // ==========================================================================
    // 3. ACESSIBILIDADE POR VOZ (SPEECH SYNTHESIS API)
    // ==========================================================================
    const synth = window.speechSynthesis;
    let sinteseVozUtterance = null;

    document.getElementById("btn-ouvir").addEventListener("click", () => {
        // Se já houver uma leitura em andamento, cancela para recomeçar
        if (synth.speaking) {
            synth.cancel();
        }

        // Seleciona exclusivamente o container do conteúdo principal para leitura
        const areaDeLeitura = document.getElementById("conteudo-principal");
        
        // Remove elementos visuais de interação e formulários do escopo de voz
        // Clonamos o nó para poder tratar o texto puramente sem estragar a tela
        const cloneConteudo = areaDeLeitura.cloneNode(true);
        const elementosParaRemover = cloneConteudo.querySelectorAll("aside, button, form, .acordeao-cabecalho");
        elementosParaRemover.forEach(el => el.remove());

        // Captura o texto limpo restante
        const textoParaLer = cloneConteudo.innerText;

        // Configura o motor de conversão de texto em fala nativo
        sinteseVozUtterance = new SpeechSynthesisUtterance(textoParaLer);
        sinteseVozUtterance.lang = "pt-BR"; // Define o idioma local
        sinteseVozUtterance.rate = 1.0;     // Velocidade padrão da fala

        // Executa a leitura em voz alta
        synth.speak(sinteseVozUtterance);
    });

    // Evento para interromper imediatamente a reprodução de voz
    document.getElementById("btn-parar").addEventListener("click", () => {
        if (synth.speaking) {
            synth.cancel();
        }
    });

    // Interrompe a voz automaticamente se o usuário sair ou fechar a aba
    window.addEventListener("beforeunload", () => {
        synth.cancel();
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