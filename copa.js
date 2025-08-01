// Lista de 108 países
const paises = [
  "brasil","argentina","colombia","alemania","albania","andorra","arabiasaudita","argelia","armenia","australia",
  "austria","azerbaiyan","bangladesh","belgica","bielorrusia","bolivia","bosnia","camerun","canada","chile",
  "china","chipre","colombia","coreadelsur","costa de marfil","costa rica","croacia","cuba","curazao","dinamarca",
  "ecuador","egipto","el salvador","emiratos arabes","escocia","eslovaquia","eslovenia","espana","eslovenia","estonia",
  "finlandia","francia","gales","georgia","ghana","gibraltar","granada","grecia","guatemala","honduras",
  "hungria","inglaterra","irak","iran","irlanda","irlanda del norte","islandia","islas feroe","islas malvinas","islas marshall",
  "islas salomon","italia","jamaica","japon","jordania","kazakhstan","kosovo","letonia","liechtenstein","lituania",
  "luxemburgo","macedonia","mali","malta","marruecos","martinica","mexico","moldavia","montenegro","nicaragua",
  "nigeria","noruega","nuevazelanda","paisesbajos","panama","paraguay","peru","polonia","portugal","qatar",
  "republica dominicana","republica checa","rumania","rusia","san marino","senegal","serbia","sudafrica","suecia","suiza",
  "surinam","tahiti","tunez","turquia","ucrania","uruguay","usa","venezuela"
];

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

let gruposGlobal = [];

document.getElementById("btn-iniciar").addEventListener("click", function () {
  const paisSeleccionado = document.getElementById("seleccion-pais").value;
  if (!paisSeleccionado) {
    alert("¡Selecciona tu país favorito para empezar!");
    return;
  }

  // Mezcla el resto y arma los grupos
  const paisesSinFavorito = paises.filter(p => p !== paisSeleccionado);
  shuffleArray(paisesSinFavorito);

  // 48 equipos: tu favorito + 47 al azar
  const paisesCopa = [paisSeleccionado, ...paisesSinFavorito.slice(0, 47)];
  shuffleArray(paisesCopa);

  // 12 grupos de 4
  const grupos = [];
  for (let i = 0; i < 12; i++) {
    grupos.push(paisesCopa.slice(i * 4, i * 4 + 4));
  }
  gruposGlobal = grupos; // Guardar para conexión a partido.html

  mostrarGrupos(grupos);

  // Mostrar el botón de ir a partido
  document.getElementById("ir-a-partido").style.display = "block";
});

// Fisher-Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function mostrarGrupos(grupos) {
  const letras = "ABCDEFGHIJKL";
  for (let i = 0; i < 12; i++) {
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
          <span class="equipo-click" data-pais="${pais}" data-grupo="${letras[i]}">${pais.charAt(0).toUpperCase() + pais.slice(1)}</span>
        </li>`;
    });
  }

  // Añadir eventos a los equipos para ir a partido.html con info del país
  document.querySelectorAll('.equipo-click').forEach(el => {
    el.addEventListener('click', function() {
      const pais = this.dataset.pais;
      const grupo = this.dataset.grupo;
      // Guardar datos en localStorage para partido.html
      localStorage.setItem('equipoSeleccionado', pais);
      localStorage.setItem('grupoSeleccionado', grupo);
      // Si quieres toda la fase de grupos también:
      localStorage.setItem('gruposMundial', JSON.stringify(gruposGlobal));
      window.location.href = "partido.html";
    });
  });
}

// Botón IR A LA CANCHA (pasa todo el sorteo)
document.getElementById("ir-a-partido").addEventListener("click", function() {
  // Puedes guardar la info de grupos para usar en partido.html
  localStorage.setItem('gruposMundial', JSON.stringify(gruposGlobal));
  window.location.href = "partido.html";
});