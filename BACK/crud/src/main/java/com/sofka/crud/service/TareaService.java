package com.sofka.crud.service;

import com.sofka.crud.domain.Tarea;
import com.sofka.crud.repository.TareaRepository;
import com.sofka.crud.service.interfaces.ITarea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
public class TareaService implements ITarea {

    @Autowired
    private TareaRepository tareaRepository;


    @Override
    @Transactional
    public List<Tarea> getTareas() {
        return (List<Tarea>) tareaRepository.findAll();
    }

    @Override
    public Tarea crearTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }
}
