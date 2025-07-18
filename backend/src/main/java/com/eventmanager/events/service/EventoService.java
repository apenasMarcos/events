package com.eventmanager.events.service;

import com.eventmanager.events.dto.EventoRequestDTO;
import com.eventmanager.events.dto.EventoResponseDTO;
import com.eventmanager.events.entity.Evento;
import com.eventmanager.events.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    @Autowired
    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    @Transactional
    public EventoResponseDTO criarEvento(EventoRequestDTO requestDTO) {
        Evento evento = new Evento();
        evento.setTitulo(requestDTO.getTitulo());
        evento.setDescricao(requestDTO.getDescricao());
        evento.setDataHoraEvento(requestDTO.getDataHoraEvento());
        evento.setLocal(requestDTO.getLocal());
        evento.setDeleted(false);

        Evento savedEvento = eventoRepository.save(evento);
        return convertToResponseDTO(savedEvento);
    }

    public Page<EventoResponseDTO> listarEventos(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventoRepository.findByDeletedFalse(pageable)
                .map(this::convertToResponseDTO);
    }

    public Optional<EventoResponseDTO> buscarEventoPorId(Long id) {
        return eventoRepository.findByIdAndDeletedFalse(id)
                .map(this::convertToResponseDTO);
    }


    @Transactional
    public Optional<EventoResponseDTO> atualizarEvento(Long id, EventoRequestDTO requestDTO) {
        return eventoRepository.findByIdAndDeletedFalse(id)
                .map(evento -> {
                    evento.setTitulo(requestDTO.getTitulo());
                    evento.setDescricao(requestDTO.getDescricao());
                    evento.setDataHoraEvento(requestDTO.getDataHoraEvento());
                    evento.setLocal(requestDTO.getLocal());
                    Evento updatedEvento = eventoRepository.save(evento);
                    return convertToResponseDTO(updatedEvento);
                });
    }

    @Transactional
    public boolean deletarEvento(Long id) {
        return eventoRepository.findByIdAndDeletedFalse(id)
                .map(evento -> {
                    evento.setDeleted(true); // Marca como deletado
                    eventoRepository.save(evento); // Salva a alteração
                    return true;
                }).orElse(false);
    }

    private EventoResponseDTO convertToResponseDTO(Evento evento) {
        EventoResponseDTO dto = new EventoResponseDTO();
        dto.setId(evento.getId());
        dto.setTitulo(evento.getTitulo());
        dto.setDescricao(evento.getDescricao());
        dto.setDataHoraEvento(evento.getDataHoraEvento());
        dto.setLocal(evento.getLocal());
        dto.setDeleted(evento.isDeleted());
        return dto;
    }
}