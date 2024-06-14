// Funciones con la lógica del juego

import { partida } from "./modelo";

export const generarNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

export const generarNumeroCarta = (numeroAleatorio: number): number => {
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
};

export const obtenerPuntosCarta = (carta: number): number => {
  return carta > 7 ? 0.5 : carta;
};

export const sumarPuntos = (puntos: number): number => {
  return partida.puntuacion + puntos;
};
