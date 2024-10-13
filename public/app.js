document.addEventListener('DOMContentLoaded', () => {
    const especieSelect = document.getElementById('especie');
    const especieInfo = document.getElementById('especie-info');
    const especieImagen = document.getElementById('especie-imagen');
    const especieDescripcion = document.getElementById('especie-descripcion');

    const especiesData = {
        1: {
            imagen: 'https://www.larepublica.net/storage/images/2023/06/16/20230616114436.tortuga-2.x2.jpg',
            descripcion: 'Especie de tortuga marina críticamente amenazada.'
        },
        2: {
            imagen: 'https://t2.ea.ltmcdn.com/es/razas/7/0/8/rinoceronte-de-java_807_0_orig.jpg',
            descripcion: 'Uno de los mamíferos más amenazados del mundo.'
        },
        3: {
            imagen: 'https://www.ngenespanol.com/wp-content/uploads/2022/09/vaquita-marina-la-marsopa-mexicana-que-sobrevive-en-el-mar-de-cortes-770x431.jpg',
            descripcion: 'Mamífero marino endémico del Golfo de California, en peligro crítico.'
        },
        4: {
            imagen: 'https://tigers-world.com/wp-content/uploads/Tigre_de_Sumatra.jpg',
            descripcion: 'El más pequeño de los tigres, en grave peligro de extinción.'
        },
        5: {
            imagen: 'https://www.masquedonana.com/wp-content/uploads/2016/12/masquedonana-lince-iberico-parque-nacional-donana.jpg',
            descripcion: 'Felino endémico de la península ibérica, en peligro crítico.'
        }
    };

    especieSelect.addEventListener('change', (event) => {
        const selectedEspecie = event.target.value;

        if (especiesData[selectedEspecie]) {
            especieImagen.src = especiesData[selectedEspecie].imagen;
            especieDescripcion.textContent = especiesData[selectedEspecie].descripcion;
            especieImagen.style.display = 'block';
        } else {
            especieImagen.style.display = 'none';
            especieDescripcion.textContent = '';
        }
    });

    const form = document.getElementById('reporte-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            especie_id: formData.get('especie'), // Asegúrate de usar 'especie_id'
            ubicacion: formData.get('ubicacion'),
            fecha: formData.get('fecha'),
            cedula: formData.get('cedula'),
            nombre: formData.get('nombre'),
            email: formData.get('email')
        };

        console.log('Datos a enviar:', data); // Verifica los datos a enviar

        fetch('/enviar-reporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Reporte enviado exitosamente');
                form.reset();
                especieImagen.style.display = 'none';
                especieDescripcion.textContent = '';
                cargarAvistamientos(); // Carga avistamientos después de enviar el reporte
            } else {
                alert('Error al enviar el reporte');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el reporte');
        });
    });

    // Función para obtener y mostrar los avistamientos registrados
    function cargarAvistamientos() {
        fetch('/obtener-avistamientos')
            .then(response => response.json())
            .then(data => {
                console.log('Datos de avistamientos recibidos:', data);  // Agrega este log
                if (data.success) {
                    const tablaAvistamientos = document.querySelector('#avistamientos tbody');
                    tablaAvistamientos.innerHTML = '';  // Limpiar la tabla antes de cargar nuevos datos

                    data.avistamientos.forEach(avistamiento => {
                        const row = document.createElement('tr');

                        const nombreComunCell = document.createElement('td');
                        nombreComunCell.textContent = avistamiento.nombre_comun;
                        row.appendChild(nombreComunCell);

                        const ubicacionCell = document.createElement('td');
                        ubicacionCell.textContent = avistamiento.ubicacion;
                        row.appendChild(ubicacionCell);

                        const fechaCell = document.createElement('td');
                        fechaCell.textContent = new Date(avistamiento.fecha).toLocaleDateString();
                        row.appendChild(fechaCell);

                        tablaAvistamientos.appendChild(row);
                    });
                } else {
                    console.error('Error al cargar los avistamientos');
                }
            })
            .catch(error => {
                console.error('Error al obtener los avistamientos:', error);
            });
    }

    // Llama a la función para cargar avistamientos al iniciar
    cargarAvistamientos();
});
