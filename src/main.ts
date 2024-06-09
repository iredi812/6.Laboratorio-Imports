let puntuacion: number = 0;
let primeraCartaPedida: boolean = false;

// Invoca a la función en cuanto este disponible el DOM.
document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
  botonPedirCarta();
  botonMePlanto();
  nuevaPartida();
  botonVerLoQueHubieraPasado();
  muestraCartaBocaAbajo();
  bloquearBotonMePlanto(true);
});

// Funciones de inicialización de botones
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
  if (nuevaPartidaElement && nuevaPartidaElement instanceof HTMLButtonElement) {
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

// Funciones de juego
const pideCarta = (): void => {
  const numeroAleatorio: number = generarNumeroAleatorio();
  const carta: number = generarNumeroCarta(numeroAleatorio);
  bloquearBotonMePlanto(false);
  bloquearBotonVerLoQueHubieraPasado(true);
  const urlCarta: string = obtenerUrlCarta(carta);
  muestraCarta(urlCarta);
  const puntos = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntos(puntos);
  actualizarPuntos(puntosSumados);
  revisarMano();
  muestraPuntuacion();
};

const mePlanto = (): void => {
  const mensajeMePlanto = obtenerMensajePlantado();
  pintarMensaje(mensajeMePlanto);
  bloquearBotonPedirCarta(true);
  bloquearBotonMePlanto(true);
  bloquearBotonVerLoQueHubieraPasado(false);
};

const verLoQueHubieraPasado = (): void => {
  const numeroAleatorio: number = generarNumeroAleatorio();
  const carta: number = generarNumeroCarta(numeroAleatorio);
  const urlCarta: string = obtenerUrlCarta(carta);
  muestraCarta(urlCarta);
  const puntos = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntos(puntos);
  actualizarPuntos(puntosSumados);
  revisarMano();
  muestraPuntuacion();

  bloquearBotonVerLoQueHubieraPasado(true);
};

// Funciones auxiliares
const generarNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

const generarNumeroCarta = (numeroAleatorio: number): number => {
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
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

const muestraCarta = (urlCarta: string): void => {
  const imgCarta = document.getElementById("carta");
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = urlCarta;
  }
};

const obtenerPuntosCarta = (carta: number): number => {
  return carta > 7 ? 0.5 : carta;
};

const sumarPuntos = (puntos: number): number => {
  puntuacion += puntos;
  return puntuacion;
};

const actualizarPuntos = (nuevosPuntos: number): void => {
  puntuacion = nuevosPuntos;
};

const revisarMano = () => {
  if (puntuacion === 7.5) {
    pintarMensaje("¡Has ganado!");
    bloquearBotonVerLoQueHubieraPasado(false);
  } else if (puntuacion > 7.5) {
    pintarMensaje("¡Has perdido!");
    bloquearBotonPedirCarta(true);
    bloquearBotonMePlanto(true);
    bloquearBotonVerLoQueHubieraPasado(true);
  }
};

const muestraPuntuacion = (): void => {
  const puntuacionElement = document.getElementById("puntuacion");
  if (puntuacionElement && puntuacionElement instanceof HTMLDivElement) {
    puntuacionElement.innerHTML = `Su puntuación es de: ${puntuacion}`;
  }
};

const obtenerMensajePlantado = (): string => {
  let mensaje: string = "";
  if (puntuacion === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
  } else if (puntuacion < 4) {
    mensaje = "Has sido muy conservador.";
  } else if (puntuacion === 5) {
    mensaje = "¿Te ha entrado el canguelo eh?";
  } else if (puntuacion > 5 && puntuacion < 7.5) {
    mensaje = "Casi casi...";
  }
  return mensaje;
};

const pintarMensaje = (mensaje: string): void => {
  const mensajesElement = document.getElementById("mensajes");
  if (mensajesElement && mensajesElement instanceof HTMLDivElement) {
    mensajesElement.innerHTML = mensaje;
  }
};

// Bloquear botones
const bloquearBotonPedirCarta = (estaDeshabilitado: boolean): void => {
  const pedirCartaElement = document.getElementById("pedirCarta");
  if (pedirCartaElement && pedirCartaElement instanceof HTMLButtonElement) {
    pedirCartaElement.disabled = estaDeshabilitado;
  }
};

const bloquearBotonMePlanto = (estaDeshabilitado: boolean): void => {
  const mePlantoElement = document.getElementById("mePlanto");
  if (mePlantoElement && mePlantoElement instanceof HTMLButtonElement) {
    mePlantoElement.disabled = estaDeshabilitado;
  }
};

const bloquearBotonVerLoQueHubieraPasado = (
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

// Reiniciar partida
const reiniciarPartida = (): void => {
  puntuacion = 0;
  primeraCartaPedida = false;
  muestraPuntuacion();
  bloquearBotonPedirCarta(false);
  bloquearBotonMePlanto(true);
  bloquearBotonVerLoQueHubieraPasado(true);
  pintarMensaje("");
  muestraCartaBocaAbajo();
};

const muestraCartaBocaAbajo = (): void => {
  const cartasContainer = document.getElementById("cartas");
  if (cartasContainer && cartasContainer instanceof HTMLDivElement) {
    cartasContainer.innerHTML = `<img id="carta" src="https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg" alt="Carta boca abajo" width="250" height="350" />`;
  }
};
