const section_tareas = document.querySelector('.cont_tareas');
const form = document.querySelector('#form')
const btn = document.querySelector('#btnCrear')

let url = 'http://localhost:8080'
getTarea()
let subTareaEdit = {}

/**
 * Evento Click que crea una nueva tarea
 */

btn.addEventListener('click', (e) => {

    let input = document.querySelector('#tarea')
   if(input.value != ''){
    postTarea(document.querySelector('#tarea').value)
    input.value = ''
   }else{
    alert('¡Campo vacio!')
   }

   
})

/**
 * Evento click que escucha un click en todo el section que contiene todos los elementos de la pagina
 */

section_tareas.addEventListener('click', (e) => {
    directionClick(e.target)

})

/**
 * Funsion que permite udentificar el elemento que se le hace clic
 * @param {*} e recibe un targuet
 */

function directionClick(e) {

   /**
    * tiene como funcionalidad marcar como ecompletada una Subtarea 
    * 
    * acrualiza en la base de datos 
    */
    if (e.type == "checkbox") {

        

        let info = {
            id: e.parentElement.parentElement.parentElement.children[0].textContent,
            titulo: e.parentElement.parentElement.parentElement.children[1].textContent,
            echo: e.checked ? 1 : 0,
            id_padre: e.parentElement.parentElement.parentElement.children[3].children[0].textContent
        }

    
        putSubTarea(info.id_padre, info)
    }


    /**
     * tiene como funcion eliminar una tarea
     */
    if (e.classList[2] == 'btn_eliminar_tarea') {
        deleteTarea(e.previousElementSibling.textContent)
    }

    /**
     * tiene como funcion editar una Subtarea
     * 
     * en esta opcion se le da click al icono dentro del button
     */

    if (e.classList[0] == "icon_i") {

        let input = document.querySelector(`#textEdit_${subTareaEdit.id_padre}`).value
        if(input != ''){

            let sub = {
                id: subTareaEdit.id,
                titulo: document.querySelector(`#textEdit_${subTareaEdit.id_padre}`).value,
                echo: subTareaEdit.echo
    
            }
            console.log(sub)
            putSubTarea(subTareaEdit.id_padre, sub)

        }else{
            getTarea()
        }
        
       

    }

    /**
     * tiene como funcion editar una Subtarea
     * 
     * en esta opcion le da click al button
     */

    if (e.classList[0] == "icon") {

        if (e.children[0]) {
            let input = document.querySelector(`#textEdit_${subTareaEdit.id_padre}`).value
            if(input != ''){
                let sub = {
                    id: subTareaEdit.id,
                    titulo: document.querySelector(`#textEdit_${subTareaEdit.id_padre}`).value,
                    echo: subTareaEdit.echo
    
                }
    
                putSubTarea(subTareaEdit.id_padre, sub)
            }else{
                getTarea()
            }
            
        } else {

            console.log()
            let subTarea = {
                titulo: e.previousElementSibling.value,
                echo: 0
            }
            if (e.previousElementSibling.value != '') {
                postsUBTarea(e.parentElement.parentElement.id, subTarea)
                console.log(e.parentElement.parentElement.id)
            }

        }


    }

    /**
     * elimina una subtarea
     */
    if (e.classList[0] == "delete_i") {

        deleteSubTarea(e.classList[1])
    }

    /**
     * elimina una subtarea
     */
    if (e.classList[0] == "delete") {
        console.log(e.classList[1])


    }

    /**
     * guarda los datos de la subtarea y los envia al input encargado de hacer la edicion de la subtarea
     */

    if (e.classList[1] == "editar_i") {
        console.log()
        let info = {
            id_tarea: e.parentElement.previousElementSibling.textContent,
            id_sub: e.classList[0]
        }
        pintarEditar(info.id_tarea, info.id_sub)
    }
    if (e.classList[1] == "editar") {
        console.log(e.previousElementSibling.textContent)
        let info = {
            id_tarea: e.previousElementSibling.textContent,
            id_sub: e.classList[0]
        }
        pintarEditar( info.id_tarea, info.id_sub)


    }



}


/**
 * Funcion encargada de llevar la informacion dal input encargado de editar la sublase
 * @param {*} id_tare id de la Tarea
 * @param {*} id_sub  id de la subtarea
 */

function pintarEditar( id_tare, id_sub) {


    let input = document.querySelector(`#textEdit_${id_tare}`)
    input.style.width = "240px"
    input.value = document.querySelector(`#tarea_${id_sub}`).textContent

    let icon = document.querySelector(`.icon_${id_tare}`)
    subTareaEdit.id = id_sub
    subTareaEdit.titulo = input.value
    subTareaEdit.id_padre = id_tare
    subTareaEdit.echo = 0

    icon.innerHTML = '<i class="icon_i fa fa-pencil"></i>'
    icon.style.background = '#F0D405'
    console.log(subTareaEdit)

}




/**
 * Manipulaos el DOM para pintar todas nuestras tareas y subtareas
 * @param {*} tareas lista de todas las tareas
 */

function pintarTareas(tareas) {

    let resultado = ''
    let subtra = ''
    tareas.forEach(tarea => {

        subtra = ''

        tarea.subtareas.forEach(subtarear => {
            console.log(subtarear.subtraEcho == 1 ? true : false)
            let check = subtarear.subtraEcho == 1 ? 'checked' : ''
            let ckeckClass = subtarear.subtraEcho == 1 ? 'danger' : 'active'
            let dis = subtarear.subtraEcho == 1 ? 'd-none' : ''
            subtra += `
            <table class="table table-hover ">
            <thead>
              <tr>
                <th scope="col">ID </th>
                <th scope="col">SubTarea</th>
                <th scope="col">¿Completado?</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody >
              <tr class="table-${ckeckClass}">
                <th class="h5" scope="row">${subtarear.id}</th>
                <td class="h4" id="tarea_${subtarear.id}">${subtarear.subtraTitulo}</td>
                <td>
                  <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" ${check}   id="check_${subtarear.id}">
                  
                </div></td>
                <td >
                    <spam class = 'd-none'>${tarea.id}</spam> 
                  <button type="button" class=" ${subtarear.id} editar btn btn-outline-success ${dis} " id= "edit_${subtarear.id}"><i class=" ${subtarear.id} editar_i fa fa-pencil"></i></button>
                  <button type="button" class="delete ${subtarear.id} btn btn-outline-danger " id= "delete_${subtarear.id}"><i class="delete_i ${subtarear.id} fa fa-trash-o"></i></button>
                </td>
              </tr>
            </tbody>
          </table>`

        })

        resultado += `<div class="card bg-light mb-3 card_tarea col-12" ">
            <div class="card-header" id="${tarea.id}">
                <div class="header_card">
                    <h4 >${tarea.traTitulo}</h4 >
                </div>
                <spam class="spam_id">${tarea.id}</spam>
                <button type="button" class="btn btn-outline-danger btn_eliminar_tarea">Eliminar</button>

                <div class="crear">
                      
                    <input type="text" id="textEdit_${tarea.id}" placeholder="Crear" required>
                    <div class="icon icon_${tarea.id}">
                      +
                    </div>
                </div>
                
             </div>

            <div class="card-body" id="card_${tarea.id}">
            
                    ${subtra}
           
            
          </div>
            </div>
          </div>`









        //console.log(tarea)
        





    });
    section_tareas.innerHTML = resultado

}











//TODO PETICIONES DE LA BASE DE DATOS






/**
 * llamamos todas las tareas
 */

async function getTarea() {


    let res = await fetch(`${url}/tareas`)

    let data = await res.json()
    pintarTareas(data)


}


/**
 * creamos una nueva tarea
 * @param {*} titulo el titulo de la tarea
 */

async function postTarea(titulo) {

    let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                traTitulo: titulo

            })
        },
        res = await fetch(`${url}/createtarea`, options)

    getTarea()


}

/**
 * Eliminamos una tarea
 * @param {*} id id de la tarea
 */

async function deleteTarea(id) {

    let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        },
        res = await fetch(`${url}/tarea/delete/${id}`, options)
    getTarea()

}


//TODO SUBTAREAS 


/**
 * 
 * @param {*} IdTarea id de la llave foranea
 * @param {*} subtarea  objeto de la subtarea con un titulo y un 0 para crear una nueva subtarea
 */

async function postsUBTarea(IdTarea, subtarea) {

    let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                subtraTitulo: subtarea.titulo,
                subtraEcho: subtarea.echo,

                tareaTra: {
                    id: IdTarea
                }
            })
        },
        res = await fetch(`${url}/subtarea/save`, options)

    getTarea()
}

/**
 * Eliminamos una subtarea
 * @param {*} id id de la subtarea
 */
async function deleteSubTarea(id) {

    let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        },

        res = await fetch(`${url}/subtarea/delete/${id}`, options)

    getTarea()
}

/**
 * 
 * @param {*} IdTarea id de la llave foranea
 * @param {*} SubTarea objeto con la informacion de la subtarea
 */
async function putSubTarea(IdTarea, SubTarea) {

    console.log(IdTarea, SubTarea)
    let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                subtraTitulo: SubTarea.titulo,
                subtraEcho: SubTarea.echo,

                tareaTra: {
                    id: IdTarea
                }

            })
        },
        res = await fetch(`${url}/subtarea/edit/${SubTarea.id}`, options)
    getTarea()


}