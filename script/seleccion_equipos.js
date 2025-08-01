document.addEventListener('DOMContentLoaded', () => { 
    const localTeamSelect = document.getElementById('local-team');
    const visitanteTeamSelect = document.getElementById('visitante-team');
    const iniciarPartidoButton = document.getElementById('iniciar-partido');

    // Función para cargar los equipos desde el archivo JSON
    async function cargarEquipos() {
        try {
            const response = await fetch('data/equipos.json');
            const data = await response.json();
            llenarSelector(localTeamSelect, data);
            llenarSelector(visitanteTeamSelect, data);
        } catch (error) {
            console.error('Error al cargar los equipos:', error);
            alert('No se pudieron cargar los equipos.');
        }
    }

    // Función para llenar el selector de equipos
    function llenarSelector(selector, equipos) {
        equipos.forEach(equipo => {
            const option = document.createElement('option');
            option.value = equipo.id;
            option.textContent = equipo.nombre;
            selector.appendChild(option);
        });
    }

    // Función para habilitar el botón de iniciar partido cuando se seleccionan ambos equipos
    function verificarSeleccion() {
        if (
            localTeamSelect.value &&
            visitanteTeamSelect.value &&
            localTeamSelect.value !== visitanteTeamSelect.value
        ) {
            iniciarPartidoButton.disabled = false;
        } else {
            iniciarPartidoButton.disabled = true;
        }
    }

    // Escuchar los cambios en los selectores
    localTeamSelect.addEventListener('change', verificarSeleccion);
    visitanteTeamSelect.addEventListener('change', verificarSeleccion);

    // Evento para el botón de iniciar partido
    iniciarPartidoButton.addEventListener('click', () => {
        const localId = localTeamSelect.value;
        const visitanteId = visitanteTeamSelect.value;
        const localNombre = localTeamSelect.options[localTeamSelect.selectedIndex].textContent;
        const visitanteNombre = visitanteTeamSelect.options[visitanteTeamSelect.selectedIndex].textContent;

        // Redirecciona pasando los datos por URL
        window.location.href = `partido.html?equipo1=${localId}&equipo2=${visitanteId}&nombre1=${encodeURIComponent(localNombre)}&nombre2=${encodeURIComponent(visitanteNombre)}`;
    });

    // Cargar equipos al iniciar
    cargarEquipos();
});


