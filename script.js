// Seleciona os botões da página
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnContraste = document.getElementById('btn-contraste');
const btnOuvir = document.getElementById('btn-ouvir');
const btnParar = document.getElementById('btn-parar');

// Variáveis de controle
let tamanhoFonte = 100; 
const sinteseVoz = window.speechSynthesis;
let leituraAtual = null;

// 1. Aumentar fonte
btnAumentar.addEventListener('click', () => {
    tamanhoFonte += 10;
    document.body.style.fontSize = tamanhoFonte + '%';
});

// 2. Diminuir fonte
btnDiminuir.addEventListener('click', () => {
    if (tamanhoFonte > 70) { 
        tamanhoFonte -= 10;
        document.body.style.fontSize = tamanhoFonte + '%';
    }
});

// 3. Modo claro e escuro
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
});

// 4. Ouvir texto da página
btnOuvir.addEventListener('click', () => {
    sinteseVoz.cancel(); 
    const textoParaLer = document.getElementById('conteudo-principal').innerText;
    leituraAtual = new SpeechSynthesisUtterance(textoParaLer);
    leituraAtual.lang = 'pt-BR'; 
    sinteseVoz.speak(leituraAtual);
});

// 5. Parar leitura de voz
btnParar.addEventListener('click', () => {
    sinteseVoz.cancel();
});
