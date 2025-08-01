// ============================
// copa_asiatica.js
// ============================

// Lista de países de Asia (en minúsculas y sin tildes)
const paises = [
  "afganistan", "arabiasaudita", "armenia", "azerbaiyan", "barein", "bangladesh", "butan",
  "birmania", "brunei", "camboya", "china", "chipre", "corea del norte", "corea del sur",
  "emiratos arabes unidos", "filipinas", "georgia", "india", "indonesia", "iran", "iraq",
  "israel", "japon", "jordania", "kazajistan", "kirguistan", "kuwait", "laos", "libano",
  "malasia", "maldivas", "mongolia", "nepal", "oman", "pakistan", "palestina", "qatar",
  "singapur", "siria", "sri lanka", "tailandia", "tayikistan", "timor oriental", "turkmenistan",
  "uzbekistan", "vietnam", "yemen"
];

// Llenar el selector
function llenarSelector() {
  const selector = document.getElementById("seleccion-pais");
  selector.innerHTML = '<option value="">Selecciona tu país favorito...</option>';
  paises.forEach(pais => {
    const opt = document.createElement("option");
    opt.value = pais;
    opt.textContent = pais.charAt(0).toUpperCase() + pais.slice(1);
    selector.appendChild(opt);
  });
}
llenarSelector();

// Evento para iniciar la Copa Asiática
document.getElementById("btn-iniciar").addEventListener("click", function () {
  const favorito = document.getElementById("seleccion-pais").value;
  if (!favorito) {
    alert("¡Selecciona tu país favorito para empezar!");
    return;
  }

  const restantes = paises.filter(p => p !== favorito);
  shuffleArray(restantes);

  const seleccionados = [favorito, ...restantes.slice(0, 15)]; // 16 equipos
  shuffleArray(seleccionados);

  const grupos = [];
  for (let i = 0; i < 4; i++) {
    grupos.push(seleccionados.slice(i * 4, i * 4 + 4));
  }

  mostrarGrupos(grupos);
  mostrarFaseFinal(seleccionados);
});

// Mezclar array (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Mostrar grupos en HTML
function mostrarGrupos(grupos) {
  const letras = "ABCD";
  for (let i = 0; i < grupos.length; i++) {
    const ul = document.querySelector(`#grupo-${letras[i].toLowerCase()} .lista-equipos`);
    ul.innerHTML = "";
    grupos[i].forEach(pais => {
      const archivo = pais
        .toLowerCase()
        .replace(/á/g, "a")
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n")
        .replace(/ /g, "");
      ul.innerHTML += `
        <li>
          <img src="assets/img/escudos/${archivo}.png" alt="${pais}">
          <span>${pais.charAt(0).toUpperCase() + pais.slice(1)}</span>
        </li>`;
    });
  }
}

// Mostrar Fase Final
function mostrarFaseFinal(equipos) {
  const fases = ["cuartos", "semifinal", "final"];
  const cantidad = { "cuartos": 8, "semifinal": 4, "final": 2 };

  fases.forEach(fase => {
    const ul = document.querySelector(`#${fase} .lista-equipos`);
    ul.innerHTML = "";
    equipos.slice(0, cantidad[fase]).forEach(pais => {
      const archivo = pais
        .toLowerCase()
        .replace(/á/g, "a")
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n")
        .replace(/ /g, "");
      ul.innerHTML += `
        <li>
          <img src="assets/img/escudos/${archivo}.png" alt="${pais}">
          <span>${pais.charAt(0).toUpperCase() + pais.slice(1)}</span>
        </li>`;
    });
  });
}

// Ocultar video intro cuando termina
window.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video-intro");
  if (video) {
    video.addEventListener("ended", () => {
      video.classList.add("finished");
    });
  }
});
