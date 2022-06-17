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
   
    console.log(e.type)

    if(e.type == "checkbox"){

        let info ={
            id: e.parentElement.parentElement.parentElement.children[0].textContent,
            titulo: e.parentElement.parentElement.parentElement.children[1].textContent,
            echo: e.checked? 1 : 0,
            id_padre: e.parentElement.parentElement.parentElement.children[3].children[0].textContent
        }
        
        console.log(info)
        putSubTarea(info.id_padre, info)
    }
    
    if (e.classList[2] == 'btn_eliminar_tarea') {
        deleteTarea(e.previousElementSibling.textContent)
    }



    if(e.classList[0] == "icon_i"){
       
         let sub = {
            id: subTareaEdit.id,
            titulo: document.querySelector(`#textEdit_${subTareaEdit.id_padre}`).value,
            echo: subTareaEdit.echo

        }  
       console.log(sub)
      putSubTarea(subTareaEdit.id_padre, sub)

    }
    

    if (e.classList[0] == "icon") {
        
        if(e.children[0]){
            let sub = {
                id: subTareaEdit.id,
                titulo: document.querySelector(`#textEdit_${subTareaEdit.id_padre}`).value,
                echo: subTareaEdit.echo
    
            }  
         
          putSubTarea(subTareaEdit.id_padre, sub)
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

      
    }
    if(e.classList[0] == "delete_i"){
     
        deleteSubTarea(e.classList[1])
    }
    if (e.classList[0] == "delete") {
       console.log(e.classList[1])
        
      
    }

    if(e.classList[1] == "editar_i"){
        console.log()
        let info = {
            id_tarea : e.parentElement.previousElementSibling.textContent,
            id_sub : e.classList[0]
        }
        pintarEditar(e,info.id_tarea,info.id_sub)
    }
    if (e.classList[1] == "editar") {
        console.log(e.previousElementSibling.textContent)
        let info = {
            id_tarea : e.previousElementSibling.textContent,
            id_sub : e.classList[0]
        }
        pintarEditar(e,info.id_tarea,info.id_sub)
        
      
    }



}

function pintarEditar(e,id_tare,id_sub){

   
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


function pintarTareas(tareas) {

    let resultado = ''
    let subtra = ''
    tareas.forEach(tarea => {

        subtra = ''

        tarea.subtareas.forEach(subtarear => {
            console.log(subtarear.subtraEcho == 1? true: false)
            let check = subtarear.subtraEcho == 1? 'checked': ''
            let ckeckClass = subtarear.subtraEcho == 1? 'danger': 'active'
            let dis = subtarear.subtraEcho == 1? 'd-none': ''
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
                <th scope="row">${subtarear.id}</th>
                <td id="tarea_${subtarear.id}">${subtarear.subtraTitulo}</td>
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

        getTarea()
}


async function putSubTarea(IdTarea, SubTarea) {

    console.log(IdTarea, SubTarea   )
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