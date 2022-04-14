const btnAgregar = document.querySelector('.fake-btn');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const btnCancelar = document.querySelector('.btnCancelar');
const btnCancelarEditar = document.querySelector('.btnCancelarEditar');

//Forms
const form = document.getElementById('form');
const form2 = document.getElementById('form2');


//Inputs

const nombreTarea = document.getElementById('inputNombreTarea');
const descripcionTarea = document.getElementById('inputDescripcionTarea');
const estado = document.getElementById('estado');
const estadoEditar = document.getElementById('estadoEditar');

const nombreTareaEditar = document.getElementById('inputNombreTareaEditar');
const descripcionTareaEditar = document.getElementById('inputDescripcionTareaEditar');



let tituloAnterior;
let descripcionAnterior;
let estadoTareaAnterior;


//Contenedor de lista de tareas

const flexContainer = document.querySelector('.flex-container');



//Botones de filtrado
const btnVerTodasTareas = document.querySelector('.btn-ver-todas');
const btnVerTareasEnProgreso = document.querySelector('.btn-ver-progreso');
const btnVerTareasPendientes = document.querySelector('.btn-ver-pendientes');
const btnVerTareasFinalizadas = document.querySelector('.btn-ver-finalizadas');

let indiceTareaBorrada;

let arrayTareas = [];

//Listeners

//Filtrado de tareas


btnVerTodasTareas.addEventListener('click', VerTodasLasTareas);
btnVerTareasEnProgreso.addEventListener('click', VerTareasEnProgreso);
btnVerTareasPendientes.addEventListener('click', VerTareasPendientes);
btnVerTareasFinalizadas.addEventListener('click', VerTareasFinalizadas);

//Edición de tareas

form2.addEventListener('submit', Editar)



// Abre y cierra el modal para agregar tareas

btnAgregar.addEventListener('click', () => {
    nombreTarea.value = "";
    descripcionTarea.value = "";
    estado.value = "pendiente";
    modal1.showModal();

})
btnCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    modal1.close();
})

btnCancelarEditar.addEventListener('click', (e) => {
    e.preventDefault();
    modal2.close();
})


// Creo el objeto "tarea" cuando agrego una tarea y luego lo meto en un array de objetos
form.addEventListener('submit', (e) => {

    let buscarDescripcion = descripcionTarea.value;
    console.log(buscarDescripcion)
    for (let i = 0; i < arrayTareas.length; i++) {
        console.log(arrayTareas[i].descripcion)
        if (arrayTareas[i].descripcion === buscarDescripcion) {
            alert("Las descripciones deben ser diferentes entre ellas")
            return;
        }
    }

    const tarea = {
        "titulo": nombreTarea.value,
        "descripcion": descripcionTarea.value,
        "estado": estado.value,
        "indice": arrayTareas.length
    }

    arrayTareas.push(tarea);

    CrearTareas(tarea);


})



function Editar() {
    let nuevaDescripcion = descripcionTareaEditar.value;
    let nuevoTitulo = nombreTareaEditar.value;
    let nuevoEstado = estadoEditar.value;


    //Busco en el array el titulo anterior de la tarea y reemplazo el valor de los atributos por los nuevos valores
    for (let i = 0; i < arrayTareas.length; i++) {

        if (arrayTareas[i].titulo === tituloAnterior) {
            arrayTareas[i].titulo = nuevoTitulo;
            arrayTareas[i].estado = nuevoEstado;
            arrayTareas[i].descripcion = nuevaDescripcion;
        }
    }

    //Actualizo la lista de tareas creándola de nuevo con los nuevos valores guardados en el array
    borrarTodo();
    for (let i = 0; i < arrayTareas.length; i++) {
        CrearTareas(arrayTareas[i])
    }


}


// Crear tarjetas de tareas


function CrearTareas(objeto) {

    //Creo los contenedores
    const tarjeta = document.createElement('div');
    const tituloTarjeta = document.createElement('div');
    const descripcionTarjeta = document.createElement('div');
    const contenedorIconosTarjeta = document.createElement('div');
    const borrarTarea = document.createElement('span');

    //Editar (creo un elemento span en el que va a ir el ícono correspondiente)
    const editarTarea = document.createElement('span');


    //Agrego título y descripción a las tareas

    tituloTarjeta.textContent = objeto.titulo;
    descripcionTarjeta.textContent = objeto.descripcion;

    //Estado de la tarea en ::before pseudo element

    if (objeto.estado == "pendiente") tarjeta.setAttribute('data-before', "Pendiente");
    if (objeto.estado == "progreso") tarjeta.setAttribute('data-before', "En Progreso");
    if (objeto.estado == "finalizada") tarjeta.setAttribute('data-before', "Finalizada")


    //Agrego clases

    borrarTarea.textContent = "delete";
    borrarTarea.classList.add('material-icons');
    borrarTarea.classList.add('cerrar');

    editarTarea.textContent = "mode_edit";
    editarTarea.classList.add('material-icons');
    editarTarea.classList.add('editar');

    tituloTarjeta.classList.add('tituloTarjeta');
    descripcionTarjeta.classList.add('descripcionTarjeta');
    tarjeta.classList.add('tarea');


    //Agrego un data-index para poder comparar el indicde del elemento en el DOM y en indice del objeto que le corresponde dentro del array
    //para luego poder borrar el objeto dentro del array cuando borro el DOM element y evitar que siga siga siendo visible en la página.

    borrarTarea.setAttribute('title', 'Eliminar');
    editarTarea.setAttribute('title', 'Editar');
    tarjeta.setAttribute("data-index", arrayTareas.length - 1);

    //Agrego elementos al DOM

    contenedorIconosTarjeta.appendChild(editarTarea);
    contenedorIconosTarjeta.appendChild(borrarTarea);
    tituloTarjeta.appendChild(contenedorIconosTarjeta);

    tarjeta.appendChild(tituloTarjeta);
    tarjeta.appendChild(descripcionTarjeta);
    flexContainer.appendChild(tarjeta);

    let btnCerrar = document.querySelectorAll('.cerrar');
    let btnEditar = document.querySelectorAll('.editar');


    //Borra las tareas del array al apretar el ícono

    for (let i = 0; i < btnCerrar.length; i++) {
        btnCerrar[i].addEventListener('click', () => {

            btnCerrar[i].parentElement.parentElement.parentElement.remove();

            indiceTareaBorrada = btnCerrar[i].parentElement.parentElement.nextElementSibling.textContent;

            for (i = 0; i < arrayTareas.length; i++) {
                if (indiceTareaBorrada === arrayTareas[i].descripcion) {
                    arrayTareas.splice(i, 1);
                }
            }

        })
    }


    //Abre el modal cuando se presiona la opcion para editar

    for (let i = 0; i < btnEditar.length; i++) {
        btnEditar[i].addEventListener('click', () => {

            //Los iconos devuelven un string "mode_editdelete" que hay que eliminar.
            let deleteThisWords = "mode_editdelete";
            tituloAnterior = btnEditar[i].parentElement.parentElement.textContent.split(deleteThisWords).toString();
            //Remueve la coma al final 
            tituloAnterior = tituloAnterior.replace(/,/g, "");
            descripcionAnterior = btnEditar[i].parentElement.parentElement.nextElementSibling.textContent;

            //Estado

            estadoTareaAnterior = btnEditar[i].parentElement.parentElement.parentElement.getAttribute('data-before');

            if (estadoTareaAnterior === "En Progreso") estadoEditar.value = "progreso";
            if (estadoTareaAnterior === "Pendiente") estadoEditar.value = "pendiente";
            if (estadoTareaAnterior === "Finalizada") estadoEditar.value = "finalizada";



            //Cuando se abre el modal se auto completan los inputs con los valores de la tarea seleccionada
            nombreTareaEditar.value = tituloAnterior;
            descripcionTareaEditar.value = descripcionAnterior;



            modal2.showModal();

        })

    }
}






function VerTodasLasTareas() {
    if (arrayTareas.length === 0) return;

    borrarTodo();

    for (let i = 0; i < arrayTareas.length; i++) {

        CrearTareas(arrayTareas[i]);
    }

}

function VerTareasPendientes() {
    if (arrayTareas.length === 0) return;
    borrarTodo();

    for (let i = 0; i < arrayTareas.length; i++) {
        if (arrayTareas[i].estado === "pendiente") {
            CrearTareas(arrayTareas[i]);
        }
    }

}

function VerTareasEnProgreso() {
    if (arrayTareas.length === 0) return;

    borrarTodo();

    for (let i = 0; i < arrayTareas.length; i++) {
        if (arrayTareas[i].estado === "progreso") {
            CrearTareas(arrayTareas[i]);
        }

    }

}

function VerTareasFinalizadas() {
    if (arrayTareas.length === 0) return;

    borrarTodo();

    for (let i = 0; i < arrayTareas.length; i++) {

        if (arrayTareas[i].estado === "finalizada") {
            CrearTareas(arrayTareas[i]);
        }
    }

}

function borrarTodo() {
    const tareas = document.querySelectorAll('.tarea')
    for (let i = 0; i < tareas.length; i++) {
        tareas[i].remove();
    }

}


