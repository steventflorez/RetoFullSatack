package com.sofka.crud.repository;

import com.sofka.crud.domain.Tarea;
import org.springframework.data.repository.CrudRepository;

public interface TareaRepository extends CrudRepository<Tarea, Integer> {
}