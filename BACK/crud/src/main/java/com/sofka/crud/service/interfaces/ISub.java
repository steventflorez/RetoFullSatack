package com.sofka.crud.service.interfaces;

import com.sofka.crud.domain.Subtarea;

import java.util.ArrayList;
import java.util.List;

public interface ISub {

    public List<Subtarea> getSubtarea();

    public  Subtarea crearSubtarea(Subtarea subtarea);
    public Subtarea updateSubtarea(Integer id, Subtarea subtarea);
    public Subtarea deleteSubtarea(Integer id);


}
