const section_tareas = document.querySelector('.cont_tareas');
const form = document.querySelector('#form')
const btn = document.querySelector('#btnCrear')

let url = 'http://localhost:8080'
getTarea()
let subTareaEdit = {}

btn.addEventListener('click', (e) => {

    postTarea(document.querySelector('#tarea').value)
    document.querySelector('#tarea').value = ''
})

section_tareas.addEventListener('click', (e) => {
    directionClick(e.target)
})

function directionClick(e) {

    if (e.classList[2] == 'btn_eliminar_tarea') {
        deleteTarea(e.previousElementSibling.textContent)
    }

    if (e.classList[0] == "icon") {
        //id 

        
        if(e.children[0]){
            console.log('hola')
        }else{
            
            console.log()
            let subTarea = {
                titulo: e.previousElementSibling.value,
                echo: 0
            }
            if(e.previousElementSibling.value != ''){
                postsUBTarea(e.parentElement.parentElement.id, subTarea)
            console.log(e.parentElement.parentElement.id)
            }
            
        }

       /*  console.log()
        let subTarea = {
            titulo: e.previousElementSibling.value,
            echo: 0
        }
        postsUBTarea(e.parentElement.parentElement.id, subTarea)
        console.log(e.parentElement.parentElement.id) */

    }
    console.log(e.classList)
    if (e.classList[1] == "editar") {
        console.log(e.previousElementSibling.textContent )

       /*  let input = document.querySelector(`#textEdit_${e.classList[0]}`)
        input.style.width = "240px"
        input.value = document.querySelector(`#tarea_${e.classList[1]}`).textContent

        let icon = document.querySelector(`.icon_${e.classList[0]}`)
        subTareaEdit.id = e.classList[1]
        subTareaEdit.titulo = input.value
        subTareaEdit.id_padre = e.classList[0]
        subTareaEdit.echo = 0

        icon.innerHTML = '<i class="fa fa-pencil"></i>'
        icon.style.background = '#F0D405'
        console.log(subTareaEdit) */
    }









}


function pintarTareas(tareas) {

    let resultado = ''
    let subtra = ''
    tareas.forEach(tarea => {

        subtra = ''

        tarea.subtareas.forEach(subtarea => {
            console.log(tarea.id)
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
              <tr class="table-active">
                <th scope="row">${subtarea.id}</th>
                <td id="tarea_${subtarea.id}">${subtarea.subtraTitulo}</td>
                <td>
                  <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="check_${subtarea.id}">
                  
                </div></td>
                <td >
                    <spam id='id_sub_${subtarea.id}'>${tarea.id}</spam> 
                  <button type="button" class=" ${subtarea.id} editar btn btn-outline-success " id= "edit_${subtarea.id}"><i class="${tarea.id} ${subtarea.id} editar fa fa-pencil"></i></button>
                  <button type="button" class="btn btn-outline-danger" id= "delete_${subtarea.id}"><i class="fa fa-trash-o"></i></button>
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
        section_tareas.innerHTML = resultado





    });

}





















async function getTarea() {


    let res = await fetch(`${url}/tareas`)

    let data = await res.json()
    pintarTareas(data)


}




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


async function getSubtarea() {
    let res = await fetch(`${url}/subtarea`)

    let data = await res.json()
    console.log(data)
}



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


async function deleteSubTarea(id) {

    let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        },
        
        res = await fetch(`${url}/subtarea/delete/${id}`, options)


}


async function putSubTarea(IdTarea, SubTarea) {

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


}