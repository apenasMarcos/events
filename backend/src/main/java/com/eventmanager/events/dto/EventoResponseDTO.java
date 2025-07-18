package com.eventmanager.events.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventoResponseDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private LocalDateTime dataHoraEvento;
    private String local;
    private boolean deleted; // Incluímos o campo deleted na resposta
}