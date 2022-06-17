package com.sofka.crud.controller;


import com.sofka.crud.domain.Subtarea;
import com.sofka.crud.domain.Tarea;
import com.sofka.crud.service.SubTareaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
public class SubtareaController {

    @Autowired
    public SubTareaService subTareaService;

    /**
     * Peticion de crear tarea
     * @param subtarea Recibe un objeto Subtarea
     */

    @PostMapping(path = "/subtarea/save")
    public void crearSubtarea(@RequestBody Subtarea subtarea) {
        subTareaService.crearSubtarea(subtarea);
    }

    /**
     * llamamos todas las Subtareas
     * @return Retorna una lista con todas las subtareas
     */

    @GetMapping(path = "/subtarea")
    public List<Subtarea> getSubtarea(){
        return  subTareaService.getSubtarea();
    }

    /**
     * Editamos una subtarea
     * @param subtarea objeto con los nuevos datos de la subtarea
     * @param subtar id de la subtarea que vamos a editar
     * @return
     */

    @PutMapping(path = "/subtarea/edit/{id}")
    public Object buscarSubtarea(@RequestBody Subtarea subtarea,@PathVariable(value = "id") Integer subtar){
        Object data = subTareaService.updateSubtarea(subtar,subtarea);
        return data;
    }

    /**
     * Eliminamos una Subtarea
     * @param id id de la tarea que se quiere eliminar
     */

    @DeleteMapping(path = "/subtarea/delete/{id}")
    public void deleteSubtarea(@PathVariable ("id") Integer id){
        subTareaService.deleteSubtarea(id);
    }



}
