package com.sofka.crud.repository;

import com.sofka.crud.domain.Subtarea;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubtareaRepository extends CrudRepository<Subtarea, Integer> {

}