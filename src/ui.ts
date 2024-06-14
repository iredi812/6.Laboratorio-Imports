// Funciones relacionadas con la interfaz de usuario y funciones que evitar problemas de dependencias circulares

import { partida, setPuntuacion, setPrimeraCartaPedida } from "./modelo";
import {
  generarNumeroAleatorio,
  generarNumeroCarta,
  obtenerPuntosCarta,
  sumarPuntos,
} from "./motor";

export const muestraCarta = (urlCarta: string): void => {
  const imgCarta = document.getElementById("carta");
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = urlCarta;
  }
};

export const muestraPuntuacion = (): void => {
  const puntuacionElement = document.getElementById("puntuacion");
  if (puntuacionElement && puntuacionElement instanceof HTMLDivElement) {
    puntuacionElement.innerHTML = `Su puntuación es de: ${partida.puntuacion}`;
  }
};

export const pintarMensaje = (mensaje: string): void => {
  const mensajesElement = document.getElementById("mensajes");
  if (mensajesElement && mensajesElement instanceof HTMLDivElement) {
    mensajesElement.innerHTML = mensaje;
  }
};

export const bloquearBotonPedirCarta = (estaDeshabilitado: boolean): void => {
  const pedirCartaElement = document.getElementById("pedirCarta");
  if (pedirCartaElement && pedirCartaElement instanceof HTMLButtonElement) {
    pedirCartaElement.disabled = estaDeshabilitado;
  }
};

export const bloquearBotonMePlanto = (estaDeshabilitado: boolean): void => {
  const mePlantoElement = document.getElementById("mePlanto");
  if (mePlantoElement && mePlantoElement instanceof HTMLButtonElement) {
    mePlantoElement.disabled = estaDeshabilitado;
  }
};

export const bloquearBotonVerLoQueHubieraPasado = (
  estaDeshabilitado: boolean
): void => {
  const verLoQueHubieraPasadoElement = document.getElementById(
    "verLoQueHubieraPasado"
  );
  if (
    verLoQueHubieraPasadoElement &&
    verLoQueHubieraPasadoElement instanceof HTMLButtonElement
  ) {
    verLoQueHubieraPasadoElement.disabled = estaDeshabilitado;
  }
};

export const muestraCartaBocaAbajo = (): void => {
  const cartasContainer = document.getElementById("cartas");
  if (cartasContainer && cartasContainer instanceof HTMLDivElement) {
    cartasContainer.innerHTML = `<img id="carta" src="https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg" alt="Carta boca abajo" width="250" height="350" />`;
  }
};

// Aquí dejamos estas funciones para evitar problema de dependencias circulares
// Ya que si están en motor, en motor, vas a tener que importar ui y en ui usar funciones de motor y entonces tenemos el problema de dependencias circulares

export const pideCarta = (): void => {
  const numeroAleatorio: number = generarNumeroAleatorio();
  const carta: number = generarNumeroCarta(numeroAleatorio);
  bloquearBotonMePlanto(false);
  bloquearBotonVerLoQueHubieraPasado(true);
  const urlCarta: string = obtenerUrlCarta(carta);
  muestraCarta(urlCarta);
  const puntos = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntos(puntos);
  setPuntuacion(puntosSumados);
  revisarMano();
  muestraPuntuacion();
};

export const mePlanto = (): void => {
  const mensajeMePlanto = obtenerMensajePlantado();
  pintarMensaje(mensajeMePlanto);
  bloquearBotonPedirCarta(true);
  bloquearBotonMePlanto(true);
  bloquearBotonVerLoQueHubieraPasado(false);
};

export const verLoQueHubieraPasado = (): void => {
  const numeroAleatorio: number = generarNumeroAleatorio();
  const carta: number = generarNumeroCarta(numeroAleatorio);
  const urlCarta: string = obtenerUrlCarta(carta);
  muestraCarta(urlCarta);
  const puntos = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntos(puntos);
  setPuntuacion(puntosSumados);
  revisarMano();
  muestraPuntuacion();

  bloquearBotonVerLoQueHubieraPasado(true);
};

export const reiniciarPartida = (): void => {
  setPuntuacion(0);
  setPrimeraCartaPedida(false);
  muestraPuntuacion();
  bloquearBotonPedirCarta(false);
  bloquearBotonMePlanto(true);
  bloquearBotonVerLoQueHubieraPasado(true);
  pintarMensaje("");
  muestraCartaBocaAbajo();
};

const revisarMano = () => {
  if (partida.puntuacion === 7.5) {
    pintarMensaje("¡Has ganado!");
    bloquearBotonPedirCarta(true);
    bloquearBotonVerLoQueHubieraPasado(true);
    bloquearBotonMePlanto(true);
  } else if (partida.puntuacion > 7.5) {
    pintarMensaje("¡Has perdido!");
    bloquearBotonPedirCarta(true);
    bloquearBotonMePlanto(true);
    bloquearBotonVerLoQueHubieraPasado(true);
  }
};

const obtenerMensajePlantado = (): string => {
  let mensaje: string = "";
  if (partida.puntuacion === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
  } else if (partida.puntuacion < 4) {
    mensaje = "Has sido muy conservador.";
  } else if (partida.puntuacion === 5) {
    mensaje = "¿Te ha entrado el canguelo eh?";
  } else if (partida.puntuacion > 5 && partida.puntuacion < 7.5) {
    mensaje = "Casi casi...";
  }
  return mensaje;
};

const obtenerUrlCarta = (carta: number): string => {
  let cartaUrl: string = "";
  switch (carta) {
    case 1:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      cartaUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      break;
  }
  return cartaUrl;
};
