// Seleciona os botões da página
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnContraste = document.getElementById('btn-contraste');
const btnOuvir = document.getElementById('btn-ouvir');
const btnParar = document.getElementById('btn-parar');

// VARIÁVEIS DE CONTROLE
let tamanhoBaseRem = 1.0; // Começa com o valor base de 1rem do seu CSS
const sinteseVoz = window.speechSynthesis;
let leituraAtual = null;

// 1. FUNÇÃO AUMENTAR FONTE
btnAumentar.addEventListener('click', () => {
    tamanhoBaseRem += 0.1; // Sobe de 0.1 em 0.1rem
    // Altera direto na raiz (HTML), fazendo com que todos os 'rem' da página aumentem juntos
    document.documentElement.style.setProperty('--tamanho-base-fonte', tamanhoBaseRem + 'rem');
});

// 2. FUNÇÃO DIMINUIR FONTE
btnDiminuir.addEventListener('click', () => {
    if (tamanhoBaseRem > 0.7) { // Limite mínimo para o texto não sumir
        tamanhoBaseRem -= 0.1;
        document.documentElement.style.setProperty('--tamanho-base-fonte', tamanhoBaseRem + 'rem');
    }
});

// 3. FUNÇÃO MODO ESCURO (Alterado de 'modo-escuro' para 'dark-mode' para bater com seu CSS)
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// 4. FUNÇÃO OUVIR TEXTO
btnOuvir.addEventListener('click', () => {
    sinteseVoz.cancel(); 
    const textoParaLer = document.getElementById('conteudo-principal').innerText;
    leituraAtual = new SpeechSynthesisUtterance(textoParaLer);
    leituraAtual.lang = 'pt-BR'; 
    sinteseVoz.speak(leituraAtual);
});

// 5. FUNÇÃO PARAR LEITURA
btnParar.addEventListener('click', () => {
    sinteseVoz.cancel();
});
// Seleciona todos os botões dos blocos expansíveis
const botoesAcordeao = document.querySelectorAll('.acordeao-cabecalho');

botoesAcordeao.forEach(botao => {
    botao.addEventListener('click', () => {
        // Pega o item do acordeão atual (o pai do botão)
        const itemAtual = botao.parentElement;
        
        // Abre ou fecha o item atual alternando a classe 'ativo'
        itemAtual.classList.toggle('ativo');
        
        // Verifica se o item está aberto ou fechado
        const estaAberto = itemAtual.classList.contains('ativo');
        
        // Atualiza a acessibilidade (aria-expanded)
        botao.setAttribute('aria-expanded', estaAberto);
        
        // Muda o ícone visual entre + e -
        const icone = botao.querySelector('.icone-status');
        icone.textContent = estaAberto ? '-' : '+';
    });
});
