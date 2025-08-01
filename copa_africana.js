// ============================
// copa_africana.js
// ============================

// Lista de países de África (sin tildes y en minúsculas)
const paises = [
  "argelia", "angola", "benin", "botsuana", "burkina faso", "burundi",
  "cabo verde", "camerun", "chad", "comoras", "congo", "costa de marfil",
  "egipto", "eritrea", "esuatini", "etiopia", "gabon", "gambia",
  "ghana", "guinea", "guinea bisau", "guinea ecuatorial", "kenia", "lesoto",
  "liberia", "libia", "madagascar", "malaui", "mali", "marruecos",
  "mauricio", "mauritania", "mozambique", "namibia", "niger", "nigeria",
  "republica centroafricana", "republica democratica del congo", "ruanda",
  "santo tome y principe", "senegal", "seychelles", "sierra leona",
  "somalia", "sudan", "sudan del sur", "tanzania", "togo", "tunez",
  "uganda", "yibuti", "zambia", "zimbabwe"
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

// Evento para iniciar la Copa Africana
document.getElementById("btn-iniciar").addEventListener("click", function () {
  const favorito = document.getElementById("seleccion-pais").value;
  if (!favorito) {
    alert("¡Selecciona tu país favorito para empezar!");
    return;
  }

  const restantes = paises.filter(p => p !== favorito);
  shuffleArray(restantes);

  const seleccionados = [favorito, ...restantes.slice(0, 23)]; // 24 equipos
  shuffleArray(seleccionados);

  const grupos = [];
  for (let i = 0; i < 6; i++) {
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
  const letras = "ABCDEF";
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
  const fases = ["octavos", "cuartos", "semifinal", "final"];
  const cantidad = { "octavos": 16, "cuartos": 8, "semifinal": 4, "final": 2 };

  fases.forEach(fase => {
    const ul = document.querySelector(`#${fase} .lista-equipos`);
    if (ul) {
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
    }
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
