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


    /**
     * Trae Las tareas
     * @return Retorna una lista con todas las tareas
     */
    @Override
    public List<Tarea> getTareas() {
        return (List<Tarea>) tareaRepository.findAll();
    }

    /**
     * crea una tarea
     * @param tarea Recube un Objeto con un Titulo de la tarea
     * @return Retorna una tarea
     */

    @Override
    public Tarea crearTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    /**
     * Elimina una tarea
     * @param id Recibe el id de la tarea
     */
    @Override
    public void deleteTarea(Integer id) {
        tareaRepository.deleteById(id);
    }
}
