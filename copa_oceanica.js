// ============================
// copa_oceanica.js
// ============================

// Lista de países de Oceanía (en minúsculas y sin tildes)
const paises = [
  "australia", "fiyi", "islas marshall", "islas salomon", "kiribati",
  "micronesia", "nauru", "nueva zelanda", "palaos", "papua nueva guinea",
  "samoa", "samoa americana", "tonga", "tuvalu", "vanuatu"
];

// Llenar el selectorunction llenarSelector() {
  const selector = document.getElementById("seleccion-pais");
  selector.innerHTML = '<option value="">Selecciona tu país favorito...</option>';
  paises.forEach(pais => {
    const opt = document.createElement("option");
    opt.value = pais;
    opt.textContent = pais.charAt(0).toUpperCase() + pais.slice(1);
    selector.appendChild(opt);
  });

llenarSelector();

// Evento para iniciar la Copa Oceánica
document.getElementById("btn-iniciar").addEventListener("click", function () {
  const favorito = document.getElementById("seleccion-pais").value;
  if (!favorito) {
    alert("  Selecciona tu país favorito para empezar!");
    return;
  }

  const restantes = paises.filter(p => p !== favorito);
  shuffleArray(restantes);

  const seleccionados = [favorito, ...restantes.slice(0, 7)]; // 8 equipos
  shuffleArray(seleccionados);

  const grupos = [
    seleccionados.slice(0, 4),
    seleccionados.slice(4, 8)
  ];

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
  const letras = ["A", "B"];
  for (let i = 0; i < grupos.length; i++) {
    const ul = document.querySelector(`#grupo-${letras[i].toLowerCase()} .lista-equipos`);
    ul.innerHTML = "";
    grupos[i].forEach(pais => {
      const archivo = pais
        .toLowerCase()
        .replace(/\u00e1/g, "a")
        .replace(/\u00e9/g, "e")
        .replace(/\u00ed/g, "i")
        .replace(/\u00f3/g, "o")
        .replace(/\u00fa/g, "u")
        .replace(/\u00f1/g, "n")
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
  const fases = ["semifinal", "final"];
  const cantidad = { "semifinal": 4, "final": 2 };

  fases.forEach(fase => {
    const ul = document.querySelector(`#${fase} .lista-equipos`);
    if (ul) {
      ul.innerHTML = "";
      equipos.slice(0, cantidad[fase]).forEach(pais => {
        const archivo = pais
          .toLowerCase()
          .replace(/\u00e1/g, "a")
          .replace(/\u00e9/g, "e")
          .replace(/\u00ed/g, "i")
          .replace(/\u00f3/g, "o")
          .replace(/\u00fa/g, "u")
          .replace(/\u00f1/g, "n")
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
