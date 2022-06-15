package com.sofka.crud.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
@Data
@Entity
@Table(name = "tarea")

public class Tarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tra_id", nullable = false)
    private Integer id;

    @Column(name = "tra_titulo", nullable = false, length = 100)
    private String traTitulo;


    @OneToMany(mappedBy = "tareaTra")

    @JsonManagedReference
    private List<Subtarea> subtareas = new ArrayList<>();

}