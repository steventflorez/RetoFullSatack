package com.sofka.crud.domain;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tarea_tra_id", nullable = false)
    private Tarea tareaTra;



}