package com.sofka.crud.service.interfaces;

import com.sofka.crud.domain.Tarea;
import com.sofka.crud.repository.TareaRepository;

import java.util.List;

public interface ITarea {

     public    List<Tarea> getTareas();

    public Tarea crearTarea(Tarea tarea);


}
