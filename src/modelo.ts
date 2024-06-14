// Lógica relacionada con los datos del juego y sus operaciones

interface Partida {
  puntuacion: number;
  primeraCartaPedida: boolean;
}

export const partida: Partida = {
  puntuacion: 0,
  primeraCartaPedida: false,
};

export const setPuntuacion = (puntos: number): void => {
  partida.puntuacion = puntos;
};

export const reiniciarPuntuacion = (): void => {
  partida.puntuacion = 0;
};

export const setPrimeraCartaPedida = (valor: boolean): void => {
  partida.primeraCartaPedida = valor;
};
