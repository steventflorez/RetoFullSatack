package com.sofka.crud.service;

import com.sofka.crud.domain.Subtarea;
import com.sofka.crud.repository.SubtareaRepository;
import com.sofka.crud.service.interfaces.ISub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class SubTareaService implements ISub {


    @Autowired
    public SubtareaRepository subtareaRepository;

    /**
     * Traer todas las Subtareas
     * @return retorna una lista con todas las Subtareas
     */
    @Override
    @Transactional
    public List<Subtarea> getSubtarea() {
        return (List<Subtarea>) subtareaRepository.findAll();
    }

    /**
     * Crear una Subtarea
     * @param subtarea objeto con los datos de la subtaria como (nombre, idForanea , cero por defecto)
     * @return retorna un objeto subTarea
     */

    @Override
    public Subtarea crearSubtarea(Subtarea subtarea) {
        return subtareaRepository.save(subtarea);
    }

    /**
     * Modificar una Subtarea
     * @param id la idForanea
     * @param subtarea Objeto con los datos de la Subtarea
     * @return retorna un Objeto con los cambios realizados
     */

    @Override
    public Subtarea updateSubtarea(Integer id, Subtarea subtarea) {
        subtarea.setId(id);
        subtareaRepository.save(subtarea);
        return subtarea;
    }

    /**
     * Eliminar una Subtarea
     * @param id id de la Subtarea
     */

    @Override
    public void deleteSubtarea(Integer id) {

        subtareaRepository.deleteById(id);
    }


}
