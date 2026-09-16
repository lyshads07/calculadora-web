let valorActual = "0";
let valorAnterior = "";
let operador = null;

const pantallaPrincipal = document.getElementById("pantalla-principal");
const pantallaAnterior = document.getElementById("operacion-anterior");

function actualizarPantalla() {
  pantallaPrincipal.textContent = valorActual;
  pantallaAnterior.textContent = valorAnterior
    ? `${valorAnterior} ${simboloOperador(operador)}`
    : "";
}

function simboloOperador(op) {
  const simbolos = { sumar: "+", restar: "−", multiplicar: "×", dividir: "÷" };
  return simbolos[op] || "";
}

function ingresarNumero(numero) {
  if (numero === "." && valorActual.includes(".")) return;
  if (valorActual === "0" && numero !== ".") {
    valorActual = numero;
  } else {
    valorActual += numero;
  }
}

function elegirOperador(nuevoOperador) {
  if (valorAnterior !== "" && operador) {
    calcular();
  }
  operador = nuevoOperador;
  valorAnterior = valorActual;
  valorActual = "0";
}

function calcular() {
  const a = parseFloat(valorAnterior);
  const b = parseFloat(valorActual);
  if (isNaN(a) || isNaN(b)) return;

  let resultado;
  switch (operador) {
    case "sumar":
      resultado = a + b;
      break;
    case "restar":
      resultado = a - b;
      break;
    case "multiplicar":
      resultado = a * b;
      break;
    case "dividir":
      resultado = b === 0 ? "Error" : a / b;
      break;
    default:
      return;
  }

  agregarAlHistorial(`${a} ${simboloOperador(operador)} ${b} = ${resultado}`);

  valorActual = resultado.toString();
  valorAnterior = "";
  operador = null;
}

const listaHistorial = document.getElementById("lista-historial");

function agregarAlHistorial(texto) {
  const item = document.createElement("li");
  item.textContent = texto;
  listaHistorial.prepend(item);
}

document
  .getElementById("limpiar-historial")
  .addEventListener("click", () => (listaHistorial.innerHTML = ""));

function limpiar() {
  valorActual = "0";
  valorAnterior = "";
  operador = null;
}

function borrar() {
  valorActual = valorActual.length > 1 ? valorActual.slice(0, -1) : "0";
}

function porcentaje() {
  valorActual = (parseFloat(valorActual) / 100).toString();
}

document.querySelectorAll(".btn-numero").forEach((btn) => {
  btn.addEventListener("click", () => {
    ingresarNumero(btn.dataset.numero);
    actualizarPantalla();
  });
});

document.querySelectorAll(".btn-operador").forEach((btn) => {
  btn.addEventListener("click", () => {
    elegirOperador(btn.dataset.accion);
    actualizarPantalla();
  });
});

document.querySelectorAll(".btn-funcion").forEach((btn) => {
  btn.addEventListener("click", () => {
    const accion = btn.dataset.accion;
    if (accion === "limpiar") limpiar();
    if (accion === "borrar") borrar();
    if (accion === "porcentaje") porcentaje();
    actualizarPantalla();
  });
});

document.querySelector(".btn-igual").addEventListener("click", () => {
  calcular();
  actualizarPantalla();
});
