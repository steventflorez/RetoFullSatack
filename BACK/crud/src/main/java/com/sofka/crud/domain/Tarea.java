package com.sofka.crud.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.LinkedHashSet;
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
    private Set<Subtarea> subtareas = new LinkedHashSet<>();



}