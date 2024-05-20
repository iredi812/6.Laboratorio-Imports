let puntuacion: number = 0;
const valoresCarta: { [key: number]: number } = { 10: 0.5, 11: 0.5, 12: 0.5 };
const cartasRepartidas: number[] = [];
let cartasSimuladas: number[] = [];

// Muestra puntuación
const muestraPuntuacion = (): void => {
  const puntuacionElement = document.getElementById("puntuacion");
  if (puntuacionElement) {
    puntuacionElement.innerHTML = `Su puntuación es de: ${puntuacion}`;
  }
};

// Invoca a la función en cuanto este disponible el DOM.
document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
  pideCarta();
  botonMePlanto();
  botonVerLoQueHubieraPasado();
  nuevaPartida();
  muestraCartaBocaAbajo();
});

// Mostrar carta boca abajo
const muestraCartaBocaAbajo = (): void => {
  const cartasContainer = document.getElementById("cartas");
  if (cartasContainer) {
    cartasContainer.innerHTML = `<img id="carta" src="https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg" alt="Carta boca abajo" width="250" height="350" />`;
  }
};

// Dame carta
const dameCarta = (): number => {
  let random: number;
  do {
    random = Math.floor(Math.random() * 10) + 1;
    random = random > 7 ? random + 2 : random;
  } while (cartasRepartidas.includes(random));

  cartasRepartidas.push(random);
  return random;
};

// Mostrar carta
const muestraCarta = (carta: number): void => {
  const cartasContainer = document.getElementById("cartas");
  if (!cartasContainer) return;

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

  if (cartaUrl) {
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", cartaUrl);
    imgElement.classList.add("carta");
    cartasContainer.appendChild(imgElement);
  }
};

// Pedir carta
const pideCarta = (): void => {
  const elemenetPideCarta = document.getElementById("pedirCarta");
  if (elemenetPideCarta) {
    elemenetPideCarta.addEventListener("click", () => {
      const carta = dameCarta();
      muestraCarta(carta);
      sumaPuntuacion(carta);
    });
  }
};

// Botón me planto
const botonMePlanto = (): void => {
  const elementMePlanto = document.getElementById("mePlanto");
  if (elementMePlanto) {
    elementMePlanto.addEventListener("click", () => {
      mePlanto();
    });
  }
};

// Botón ver lo que hubiera pasado
const botonVerLoQueHubieraPasado = (): void => {
  const elementVerLoQueHubieraPasado = document.getElementById(
    "verLoQueHubieraPasado"
  );
  if (elementVerLoQueHubieraPasado) {
    elementVerLoQueHubieraPasado.addEventListener("click", () => {
      verLoQueHubieraPasado();
    });
  }
};

// Sumar puntuación
const sumaPuntuacion = (carta: number): void => {
  if (valoresCarta[carta] !== undefined) {
    puntuacion += valoresCarta[carta];
  } else {
    puntuacion += carta;
  }
  muestraPuntuacion();
  gameOver();
};

// Game over
const gameOver = (): void => {
  const puntuacionElement = document.getElementById("puntuacion");
  const pedirCartaElement = document.getElementById("pedirCarta");
  if (!puntuacionElement || !pedirCartaElement) return;

  if (puntuacion === 7.5) {
    puntuacionElement.innerHTML = `Su puntuación es de ${puntuacion} -<span style="color: green; margin-left: 10px;">Has ganado!</span>`;
    pedirCartaElement.setAttribute("disabled", "disabled");
  } else if (puntuacion > 7.5) {
    puntuacionElement.innerHTML = `Su puntuación es de ${puntuacion} -<span style="color: red; margin-left: 10px;">Game Over!</span>`;
    pedirCartaElement.setAttribute("disabled", "disabled");
  }
};

// Me planto
const mePlanto = (): void => {
  let mensaje: string = "";
  if (puntuacion === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
    gameOver();
  } else if (puntuacion < 4) {
    mensaje = "Has sido muy conservador.";
  } else if (puntuacion === 5) {
    mensaje = "¿Te ha entrado el canguelo eh?";
  } else if (puntuacion > 5 && puntuacion < 7.5) {
    mensaje = "Casi casi...";
  }
  const mensajesElement = document.getElementById("mensajes");
  const pedirCartaElement = document.getElementById("pedirCarta");
  const verLoQueHubieraPasadoElement = document.getElementById(
    "verLoQueHubieraPasado"
  );

  if (mensajesElement && pedirCartaElement && verLoQueHubieraPasadoElement) {
    mensajesElement.textContent = mensaje;
    pedirCartaElement.setAttribute("disabled", "disabled");
    verLoQueHubieraPasadoElement.style.display = "block";
  }
};

// Ver lo que hubiera pasado
const verLoQueHubieraPasado = (): void => {
  cartasSimuladas = [];
  let puntuacionSimulada: number = puntuacion;

  while (puntuacionSimulada < 7.5) {
    const carta = dameCarta();
    cartasSimuladas.push(carta);
    if (valoresCarta[carta] !== undefined) {
      puntuacionSimulada += valoresCarta[carta];
    } else {
      puntuacionSimulada += carta;
    }
  }

  const cartasContainer = document.getElementById("cartas");
  const mensajesElement = document.getElementById("mensajes");
  if (cartasContainer && mensajesElement) {
    cartasSimuladas.forEach((carta) => muestraCarta(carta));
    mensajesElement.innerHTML += `<br/>Si hubieras seguido pidiendo cartas, habrías obtenido una puntuación de: ${puntuacionSimulada}`;
  }
};

// Nueva partida
const nuevaPartida = (): void => {
  const elementNuevaPartida = document.getElementById("nuevaPartida");
  if (elementNuevaPartida) {
    elementNuevaPartida.addEventListener("click", () => {
      puntuacion = 0;
      cartasRepartidas.length = 0;
      cartasSimuladas.length = 0;
      muestraPuntuacion();
      const mensajesElement = document.getElementById("mensajes");
      const cartasContainer = document.getElementById("cartas");
      const pedirCartaElement = document.getElementById("pedirCarta");
      const verLoQueHubieraPasadoElement = document.getElementById(
        "verLoQueHubieraPasado"
      );

      if (mensajesElement) mensajesElement.textContent = "";
      if (cartasContainer) cartasContainer.innerHTML = "";
      if (pedirCartaElement) pedirCartaElement.removeAttribute("disabled");
      if (verLoQueHubieraPasadoElement)
        verLoQueHubieraPasadoElement.style.display = "none";

      muestraCartaBocaAbajo();
    });
  }
};
