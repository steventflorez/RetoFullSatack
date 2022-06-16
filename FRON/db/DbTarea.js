

export default class DbTarea {

    static async GET  (){
        let res = await fetch("http://localhost:8080/tareas")

        let data = await res.json()
        console.log(data)

        
    }

}