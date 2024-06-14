// Inicialización del juego y la vinculación de eventos a los elementos del DOM

import {
  muestraPuntuacion,
  muestraCartaBocaAbajo,
  bloquearBotonMePlanto,
  pideCarta,
  mePlanto,
  verLoQueHubieraPasado,
  reiniciarPartida,
} from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
  inicializarBotones();
  reiniciarPartida();
  muestraCartaBocaAbajo();
  bloquearBotonMePlanto(true);
});

const inicializarBotones = (): void => {
  const botonPedirCarta = (): void => {
    const pedirCartaElement = document.getElementById("pedirCarta");
    if (pedirCartaElement && pedirCartaElement instanceof HTMLButtonElement) {
      pedirCartaElement.addEventListener("click", () => {
        pideCarta();
      });
    }
  };

  const botonMePlanto = (): void => {
    const elementMePlanto = document.getElementById("mePlanto");
    if (elementMePlanto && elementMePlanto instanceof HTMLButtonElement) {
      elementMePlanto.addEventListener("click", () => {
        mePlanto();
      });
    }
  };

  const nuevaPartida = (): void => {
    const nuevaPartidaElement = document.getElementById("nuevaPartida");
    if (
      nuevaPartidaElement &&
      nuevaPartidaElement instanceof HTMLButtonElement
    ) {
      nuevaPartidaElement.addEventListener("click", () => {
        reiniciarPartida();
      });
    }
  };

  const botonVerLoQueHubieraPasado = (): void => {
    const verLoQueHubieraPasadoElement = document.getElementById(
      "verLoQueHubieraPasado"
    );
    if (
      verLoQueHubieraPasadoElement &&
      verLoQueHubieraPasadoElement instanceof HTMLButtonElement
    ) {
      verLoQueHubieraPasadoElement.addEventListener("click", () => {
        verLoQueHubieraPasado();
      });
    }
  };

  botonPedirCarta();
  botonMePlanto();
  nuevaPartida();
  botonVerLoQueHubieraPasado();
};
