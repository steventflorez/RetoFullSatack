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


    @Override
    @Transactional
    public List<Subtarea> getSubtarea() {
        return (List<Subtarea>) subtareaRepository.findAll();
    }

    @Override
    public Subtarea crearSubtarea(Subtarea subtarea) {
        return subtareaRepository.save(subtarea);
    }

    @Override
    public Subtarea updateSubtarea(Integer id, Subtarea subtarea) {
        subtarea.setId(id);
        subtareaRepository.save(subtarea);
        return subtarea;
    }

    @Override
    public void deleteSubtarea(Integer id) {
        //var subtarea = subtareaRepository.findAllById(Collections.singleton(id));
        subtareaRepository.deleteById(id);
    }

//    @Override
//    public List<Subtarea> buscarSubtarea(String datoABuscar) {
//
//        return subtareaRepository.getSubTareas(datoABuscar);
//    }
}
