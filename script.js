// Seleção de elementos do DOM
const botaoStart = document.querySelector("#btn-start");
const botaoReset = document.querySelector("#btn-reset");
const display = document.querySelector(".display");
const displayMin = document.querySelector("#min");
const displaySec = document.querySelector("#sec");
const displayMs = document.querySelector("#ms");
const botaoColor = document.querySelector("#btn-color");
const rootElement = document.documentElement;
const botaoGravar = document.querySelector("#btn-gravar");
const displayGravacoes = document.querySelector("#gravacoes");
const botaoAcessar = document.querySelector("#btn-acessar");

// Inicialização do conteúdo do display
displayMin.textContent = "00:";
displaySec.textContent = "00:";
displayMs.textContent = "00";
displayGravacoes.textContent = "";

// Variáveis
let intervalo;
let estadoBotao = "start";
let min = 0;
let sec = 0;
let ms = 0;
let contadorMarco = 1;
let arrMarco = [];
let arrGravacoes = [];

// Função para formatar números com dois dígitos
function formatarNumero(numero) {
  return numero < 10 ? `0${numero}` : numero;
}

// Função para atualizar o conteúdo do display
function atualizarDisplay() {
  displayMin.textContent = `${formatarNumero(min)}:`;
  displaySec.textContent = `${formatarNumero(sec)}:`;
  displayMs.textContent = formatarNumero(ms / 10);
}

// Event listener para o botão de iniciar/pausar o cronômetro
botaoStart.addEventListener("click", function () {
  if (estadoBotao === "start") {
    // Inicia o cronômetro
    estadoBotao = "stop";
    intervalo = setInterval(function () {
      ms += 10;

      if (ms === 1000) {
        ms = 0;
        sec++;
      }

      if (sec === 60) {
        sec = 0;
        min++;
      }

      atualizarDisplay();
    }, 10);
  } else if (estadoBotao === "stop") {
    // Pausa o cronômetro
    clearInterval(intervalo);
    estadoBotao = "start";
  }
});

// Array de cores para o botão de cor
const arr = [
  ["#DA4167", "#F0BCD4"],
  ["#64b887", "#a5ccab"],
  ["#8447FF", "#D972FF"],
  ["#243B4A", "#6b93aa"],
  ["#f0ca22", "#6a7a85"],
];

let posi = 0;

// Evento para o botão de mudar cor
botaoColor.addEventListener("click", function () {
  posi = (posi + 1) % arr.length;
  rootElement.style.setProperty("--cor1", arr[posi][0]);
  rootElement.style.setProperty("--cor2", arr[posi][1]);
});

// Evento para o botão de gravar marco
botaoGravar.addEventListener("click", function () {
  displayGravacoes.textContent = `marco ${contadorMarco} - ${formatarNumero(
    min
  )}:${formatarNumero(sec)}:${formatarNumero(ms / 10)}`;
  arrMarco = [contadorMarco, min, sec, ms / 10];
  arrGravacoes.push(arrMarco);
  console.log(arrMarco);
  console.log(arrGravacoes);
  contadorMarco++;
});

let i = 0;

// Evento para o botão de acessar marco gravado
botaoAcessar.addEventListener("click",function(){
    displayGravacoes.textContent = `marco ${arrGravacoes[i][0]} - ${formatarNumero(arrGravacoes[i][1])}:${formatarNumero(arrGravacoes[i][2])}:${formatarNumero(arrGravacoes[i][3] / 10)}`;
    i = (i + 1) % arrGravacoes.length;
});

// Evento para o botão de reset
botaoReset.addEventListener("click", function () {
  min = 0;
  sec = 0;
  ms = 0;
  clearInterval(intervalo);
  estadoBotao = "start";
  displayGravacoes.textContent = "";
  contadorMarco = 1;
  arrMarco = [];
  arrGravacoes = [];
  atualizarDisplay();
});
