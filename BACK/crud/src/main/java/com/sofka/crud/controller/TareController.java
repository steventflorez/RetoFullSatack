package com.sofka.crud.controller;


import com.sofka.crud.domain.Tarea;
import com.sofka.crud.service.TareaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods =
        {RequestMethod.GET, RequestMethod.POST})
public class TareController {

    @Autowired
    private TareaService tareaService;

    @GetMapping(path = "/")
public List<Tarea> getTareas(){
        return tareaService.getTareas();
    }
}
