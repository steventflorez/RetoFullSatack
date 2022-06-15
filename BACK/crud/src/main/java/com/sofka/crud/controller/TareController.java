package com.sofka.crud.controller;


import com.sofka.crud.domain.Tarea;
import com.sofka.crud.service.TareaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods =
        {RequestMethod.GET, RequestMethod.POST})
public class TareController {

    @Autowired
    private TareaService tareaService;

    @GetMapping(path = "/tareas")
        public List<Tarea> getTareas(){
        return tareaService.getTareas();
    }

    @PostMapping(path = "/createtarea")
        public void createTarea(@RequestBody Tarea tarea){
           tareaService.crearTarea(tarea);
    }

    @DeleteMapping(path = "/tarea/delete/{id}")
    public void deletetarea(@PathVariable ("id") Integer id){
        tareaService.deleteTarea(id);
    }
}
