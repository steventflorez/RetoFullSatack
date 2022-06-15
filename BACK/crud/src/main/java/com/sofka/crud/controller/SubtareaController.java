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
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods =
        {RequestMethod.GET, RequestMethod.POST})
public class SubtareaController {

    @Autowired
    public SubTareaService subTareaService;

    @PostMapping(path = "/subtarea/save")
    public void crearSubtarea(@RequestBody Subtarea subtarea) {
        subTareaService.crearSubtarea(subtarea);
    }

    @GetMapping(path = "/subtarea")
    public List<Subtarea> getSubtarea(){
        return  subTareaService.getSubtarea();
    }

    @PutMapping(path = "/subtarea/edit/{id}")
    public Object buscarSubtarea(@RequestBody Subtarea subtarea,@PathVariable(value = "id") Integer subtar){
        Object data = subTareaService.updateSubtarea(subtar,subtarea);
        return data;
    }



}
