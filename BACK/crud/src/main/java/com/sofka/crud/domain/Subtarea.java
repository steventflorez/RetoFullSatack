package com.sofka.crud.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table(name = "subtarea")
public class Subtarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subtra_id", nullable = false)
    private Integer id;

    @Column(name = "subtra_titulo", nullable = false, length = 100)
    private String subtraTitulo;

    @Column(name = "subtra_echo", nullable = false)
    private Integer subtraEcho;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tarea_tra_id", nullable = false)


    @JsonBackReference
    private Tarea tareaTra;


}