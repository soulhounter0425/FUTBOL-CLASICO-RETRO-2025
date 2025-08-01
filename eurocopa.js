// Lista de países de Europa (en minúsculas y sin tildes)
const paises = [
  "albania","alemania","andorra","armenia","austria","azerbaiyan","belgica","bielorrusia","bosnia",
  "bulgaria","chipre","croacia","dinamarca","eslovaquia","eslovenia","espana","estonia","finlandia",
  "francia","georgia","grecia","hungria","irlanda","islandia","italia","kazakhstan","kosovo","letonia",
  "liechtenstein","lituania","luxemburgo","macedonia","malta","moldavia","monaco","montenegro",
  "noruega","paisesbajos","polonia","portugal","republica checa","rumania","rusia","san marino",
  "serbia","suecia","suiza","ucrania","reino unido","escocia","gales","irlanda del norte"
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

// Evento para iniciar la Eurocopa
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
});

// Mezclar array (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Mostrar en HTML
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

// Ocultar video intro cuando termina
window.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video-intro");
  if (video) {
    video.addEventListener("ended", () => {
      video.classList.add("finished");
    });
  }
});


